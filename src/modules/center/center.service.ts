import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Center } from '../../entities/Center';
import { CreateCenterDto, UpdateCenterDto } from './center.dto';
import { User } from '@/entities/User';
import { Role } from '@/entities/Role';
import { UserRole } from '@/entities/UserRole';
import { MailService } from '@/modules/global/mail.service';
import { randomBytes } from 'crypto';

@Injectable()
export class CenterService {
  private readonly logger = new Logger(CenterService.name);

  constructor(
    @InjectRepository(Center)
    private readonly centerRepo: Repository<Center>,
    private readonly mailService: MailService,
  ) {}

  async findAll() {
    return this.centerRepo.find();
  }

  async findOne(id: number) {
    return this.centerRepo.findOne({ where: { id } });
  }

  async create(dto: CreateCenterDto, authUser?: any) {
    const center = this.centerRepo.create(dto);
    const savedCenter = await this.centerRepo.save(center);

    // If an email was provided for the center, create a user account and send credentials
    try {
      if (dto.email) {
        // get user repository via manager to avoid circular issues
        const userRepo: Repository<User> = this.centerRepo.manager.getRepository(User) as Repository<User>;

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

        const orgId = authUser?.organizationId;
        if (!orgId) {
          this.logger.warn('No organizationId found on authUser — skipping center user creation to avoid FK constraint.');
        } else {
          const newUser = userRepo.create({
            name: dto.name,
            email: dto.email,
            password: passwordToUse,
            status: 'active',
            organizationId: orgId,
          } as any);

          const savedUser = (await userRepo.save(newUser) as unknown) as User;

        // ensure a 'Franchise' role exists for the organization and assign it to the user
        try {
          const roleRepo = this.centerRepo.manager.getRepository(Role) as Repository<Role>;
          let franchiseRole = (await roleRepo.findOne({ where: { name: 'Franchise', organizationId: savedUser.organizationId } })) as Role | null;
          if (!franchiseRole) {
            franchiseRole = (roleRepo.create({
              name: 'Franchise',
              organizationId: savedUser.organizationId,
              description: 'Franchise Role',
              isPrimary: false,
              roleType: 'franchise',
              status: 'active',
              permissionCount: 0,
            } as any) as unknown) as Role;
            franchiseRole = await roleRepo.save(franchiseRole);
          }

          const userRoleRepo = this.centerRepo.manager.getRepository(UserRole) as Repository<UserRole>;
          const userRole = userRoleRepo.create({ roleId: (franchiseRole as Role).id, userId: savedUser.id } as any);
          await userRoleRepo.save(userRole);
        } catch (e) {
          this.logger.warn('Failed to assign Franchise role to center user', e);
        }

          // send welcome email with credentials file attachment (best-effort)
        try {
          const fileContent = `Login credentials\nEmail: ${dto.email}\nPassword: ${passwordToUse}\nPlease change your password after first login.`
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
          this.logger.warn('Failed to send credentials attachment for center user', e);
        }
        }
      }
    } catch (err) {
      this.logger.error('Error creating center user', err);
    }

    return savedCenter;
  }

  async update(id: number, dto: UpdateCenterDto) {
    await this.centerRepo.update(id, dto);
    return this.findOne(id);
  }

  async deactivate(id: number) {
    await this.centerRepo.update(id, { isActive: false });
    return this.findOne(id);
  }

  async activate(id: number) {
    await this.centerRepo.update(id, { isActive: true });
    return this.findOne(id);
  }
}
