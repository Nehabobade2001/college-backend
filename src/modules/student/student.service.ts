/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable prettier/prettier */
import { Injectable, Logger, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Student } from '@/entities/Student'
import { CreateStudentDto, UpdateStudentDto } from './student.dto'
import { User, UserType } from '@/entities/User'
import { Role } from '@/entities/Role'
import { UserRole } from '@/entities/UserRole'
import { MailService } from '@/modules/global/mail.service'
import { randomBytes } from 'crypto'
import * as argon2 from 'argon2'

@Injectable()
export class StudentService {
  private readonly logger = new Logger(StudentService.name)

  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
    private readonly mailService: MailService,
  ) {}

  async findAll() {
    return this.userRepo.find({ where: { userType: UserType.student } })
  }

  async findOne(id: number) {
    return this.userRepo.findOne({ where: { id, userType: UserType.student } })
  }

  async create(dto: CreateStudentDto, authUser?: any) {
    if (dto.email) {
      const existingUser = await this.userRepo.findOne({ where: { email: dto.email } })
      if (existingUser) {
        throw new BadRequestException(`User with email ${dto.email} already exists`)
      }
    }

    let passwordToUse: string
    if (dto.password) {
      if (dto.confirmPassword && dto.password !== dto.confirmPassword) {
        throw new BadRequestException('Password and confirmPassword must match')
      }
      passwordToUse = dto.password
    } else {
      passwordToUse = randomBytes(6).toString('hex')
    }

    const orgId = authUser?.organizationId ?? dto.organizationId ?? 1

    // Save to User table with all student fields
    const newUser = this.userRepo.create({
      name: `${dto.firstName || ''} ${dto.lastName || ''}`.trim(),
      email: dto.email,
      mobileNo: dto.mobileNumber ? parseInt(dto.mobileNumber) : null,
      password: passwordToUse,
      status: 'active',
      userType: UserType.student,
      designation: 'EMPLOYEE',
      organizationId: orgId,
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      pincode: dto.pincode,
      enrollmentNumber: dto.enrollmentNumber,
      courseName: dto.courseName,
      branch: dto.branch,
      semester: dto.semester,
      admissionDate: dto.admissionDate,
      sessionYear: dto.sessionYear,
      profilePhoto: dto.profilePhoto,
      aadhaarNumber: dto.aadhaarNumber,
      qualification: dto.qualification,
      percentage: dto.percentage,
      documentUrl: dto.documentUrl,
      previousMarksheet: dto.previousMarksheet,
      category: dto.category,
    } as any)

    const savedUser = await this.userRepo.save(newUser)
    const userId = (Array.isArray(savedUser) ? savedUser[0].id : (savedUser as any).id) as number

    // Save to Student table with all fields
    const student = this.studentRepo.create({
      userId,
      centerId: dto.centerId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      mobileNumber: dto.mobileNumber,
      password: passwordToUse,
      isMe: dto.isMe || false,
      gender: dto.gender,
      dateOfBirth: dto.dateOfBirth,
      organizationId: orgId,
      status: dto.status || 'active',
      isActive: true,
      qualification: dto.qualification,
      percentage: dto.percentage,
      documentUrl: dto.documentUrl,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      pincode: dto.pincode,
      enrollmentNumber: dto.enrollmentNumber,
      courseName: dto.courseName,
      branch: dto.branch,
      semester: dto.semester,
      admissionDate: dto.admissionDate,
      sessionYear: dto.sessionYear,
      profilePhoto: dto.profilePhoto,
      aadhaarNumber: dto.aadhaarNumber,
      previousMarksheet: dto.previousMarksheet,
      category: dto.category,
    } as any)

    await this.studentRepo.save(student)

    // Assign Student Role
    let studentRole = await this.roleRepo.findOne({
      where: { name: 'Student', organizationId: orgId },
    })

    if (!studentRole) {
      const newRole = this.roleRepo.create({
        name: 'Student',
        organizationId: orgId,
        description: 'Student Role',
        isPrimary: false,
        roleType: 'student',
        status: 'active',
      } as any)
      const savedRole = await this.roleRepo.save(newRole)
      studentRole = (Array.isArray(savedRole) ? savedRole[0] : savedRole) as Role
    }

    await this.userRoleRepo.save(
      this.userRoleRepo.create({
        roleId: studentRole!.id,
        userId,
      } as any)
    )

    // Send welcome email
    try {
      if (dto.email) {
        const fileContent = `Login Credentials\n\nEmail: ${dto.email}\nPassword: ${passwordToUse}\n\nPlease change your password after first login.`
        await this.mailService.sendWelcomeWithAttachment(
          dto.email,
          { name: `${dto.firstName || ''} ${dto.lastName || ''}`.trim(), email: dto.email },
          {},
          [{ filename: 'credentials.txt', content: fileContent }],
        )
      }
    } catch (e) {
      this.logger.warn(`Failed to send email: ${e.message}`)
    }

    return this.userRepo.findOne({ where: { id: userId } })
  }

  async update(id: number, dto: UpdateStudentDto) {
    await this.studentRepo.update(id, dto as any)
    return this.findOne(id)
  }

  async deactivate(id: number) {
    await this.studentRepo.update(id, { isActive: false } as any)
    return this.findOne(id)
  }

  async activate(id: number) {
    await this.studentRepo.update(id, { isActive: true } as any)
    return this.findOne(id)
  }
}
