import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '@/entities/Student';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { User } from '@/entities/User';
import { Role } from '@/entities/Role';
import { UserRole } from '@/entities/UserRole';
import { MailService } from '@/modules/global/mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name);

  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    private readonly mailService: MailService,
  ) {}

  async findAll() {
    return this.studentRepo.find();
  }

  async findOne(id: number) {
    return this.studentRepo.findOne({ where: { id } });
  }

  async create(dto: CreateStudentDto, authUser?: any) {
    const student = this.studentRepo.create(dto as any);
    const savedStudent = await this.studentRepo.save(student);

    try {
      if (dto.email) {
        const userRepo: Repository<User> = this.studentRepo.manager.getRepository(User) as Repository<User>;

        // determine password: admin-provided or generated
        let passwordToUse: string;
        if (dto.password) {
          if (!dto.confirmPassword || dto.password !== dto.confirmPassword) {
            throw new BadRequestException('Password and confirmPassword must match');
          }
          passwordToUse = dto.password;
        } else {
          passwordToUse = randomBytes(6).toString('hex');
        }

        const orgId = authUser?.organizationId ?? dto.organizationId;
        if (!orgId) {
          this.logger.warn('No organizationId found — skipping user creation to avoid FK constraint.');
        } else {
          const newUser = userRepo.create({
            name: dto.name,
            email: dto.email,
            password: passwordToUse,
            status: 'active',
            organizationId: orgId,
          } as any);

          const savedUser = (await userRepo.save(newUser) as unknown) as User;

          // ensure a 'Student' role exists and assign it
          try {
            const roleRepo = this.studentRepo.manager.getRepository(Role) as Repository<Role>;
            let studentRole = (await roleRepo.findOne({ where: { name: 'Student', organizationId: savedUser.organizationId } })) as Role | null;
            if (!studentRole) {
              studentRole = (roleRepo.create({
                name: 'Student',
                organizationId: savedUser.organizationId,
                description: 'Student Role',
                isPrimary: false,
                roleType: 'student',
                status: 'active',
                permissionCount: 0,
              } as any) as unknown) as Role;
              studentRole = await roleRepo.save(studentRole);
            }

            const userRoleRepo = this.studentRepo.manager.getRepository(UserRole) as Repository<UserRole>;
            const userRole = userRoleRepo.create({ roleId: (studentRole as Role).id, userId: savedUser.id } as any);
            await userRoleRepo.save(userRole);
          } catch (e) {
            this.logger.warn('Failed to assign Student role to user', e);
          }

          // send welcome email
          try {
            const fileContent = `Login credentials\nEmail: ${dto.email}\nPassword: ${passwordToUse}\nPlease change your password after first login.`;
            const attachments = [
              {
                filename: 'credentials.txt',
                content: fileContent,
              },
            ];

            await this.mailService.sendWelcomeWithAttachment(
              dto.email,
              { name: dto.name, email: dto.email },
              {},
              attachments,
            );
          } catch (e) {
            this.logger.warn('Failed to send credentials email for student', e);
          }
        }
      }
    } catch (err) {
      this.logger.error('Error creating student user', err);
    }

    return savedStudent;
  }

  async update(id: number, dto: UpdateStudentDto) {
    await this.studentRepo.update(id, dto as any);
    return this.findOne(id);
  }

  async deactivate(id: number) {
    await this.studentRepo.update(id, { isActive: false } as any);
    return this.findOne(id);
  }

  async activate(id: number) {
    await this.studentRepo.update(id, { isActive: true } as any);
    return this.findOne(id);
  }
}
