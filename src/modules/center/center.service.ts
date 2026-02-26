import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Center } from '../../entities/Center';
import { CreateCenterDto, UpdateCenterDto } from './center.dto';
import { User, UserType } from '@/entities/User';
import { Organization } from '@/entities/Organization';
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
  ) { }

  async findAll(authUser?: any) {
    if (!authUser) return this.centerRepo.find();

    // Detect franchise by userType OR by any assigned role whose name contains 'franchise'
    const isFranchise =
      String(authUser.userType || '').toLowerCase() === 'franchise' ||
      (Array.isArray(authUser.roles) &&
        authUser.roles.some((r: any) =>
          String(r.name || '').toLowerCase().includes('franchise')
        ));

    this.logger.log(
      `[findAll] user=${authUser.email} userType=${authUser.userType} isFranchise=${isFranchise}`
    );

    if (isFranchise) {
      return this.centerRepo.find({ where: { email: authUser.email } });
    }

    return this.centerRepo.find();
  }

  async findOne(id: number) {
    return this.centerRepo.findOne({ where: { id } });
  }

  async create(dto: CreateCenterDto, authUser?: any) {
    const centerPayload: Partial<Center> = {
      franchiseName: (dto as any).franchiseName ?? (dto as any).name,
      ownerName: (dto as any).ownerName,
      email: dto.email,
      contactNumber: (dto as any).contactNumber ?? (dto as any).phone,
      alternateNumber: (dto as any).alternateNumber,
      address: dto.address,
      city: dto.city,
      state: dto.state,
      pincode: dto.pincode,
      registrationNumber: dto.registrationNumber,
      gstNumber: dto.gstNumber,
      agreementStartDate: dto.agreementStartDate ? new Date(dto.agreementStartDate) : null,
      agreementEndDate: dto.agreementEndDate ? new Date(dto.agreementEndDate) : null,
    };

    const center = this.centerRepo.create(centerPayload as any);
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

        let orgId = authUser?.organizationId;

        // If no organizationId on the auth user, create a dedicated Organization for this franchise
        if (!orgId) {
          try {
            const orgRepo = this.centerRepo.manager.getRepository(Organization) as Repository<Organization>;
            const orgPayload = { name: centerPayload.franchiseName ?? 'Franchise', status: 'active' } as any;
            const createdOrg = orgRepo.create(orgPayload);
            const savedOrg = (await orgRepo.save(createdOrg)) as unknown as Organization;
            orgId = savedOrg.id;
            this.logger.log(`Created organization ${orgId} for franchise user`);
          } catch (e) {
            this.logger.warn('Failed to create Organization for franchise user — skipping user creation', e);
            orgId = null;
          }
        }

        if (!orgId) {
          this.logger.warn('No organizationId available — skipping center user creation.');
        } else {
          const newUser = userRepo.create({
            name: centerPayload.franchiseName ?? 'Franchise',
            email: dto.email,
            password: passwordToUse,
            status: 'active',
            organizationId: orgId,
            userType: UserType.franchise,
          } as any);

          const savedUser = (await userRepo.save(newUser) as unknown) as User;

          // ensure a 'Franchise' role exists for the organization and assign it to the user
          try {
            const roleRepo = this.centerRepo.manager.getRepository(Role) as Repository<Role>;

            // 1. Try to find an existing 'Franchise' role for THIS organization
            let franchiseRole = (await roleRepo.findOne({
              where: { name: 'Franchise', organizationId: savedUser.organizationId },
            })) as Role | null;

            // 2. If not found for this org, try finding any global Franchise role (shared across orgs)
            if (!franchiseRole) {
              franchiseRole = (await roleRepo.findOne({
                where: { name: 'Franchise' },
                order: { id: 'ASC' }, // pick the oldest/canonical one
              })) as Role | null;
            }

            // 3. Only create a brand-new role if absolutely none exists
            if (!franchiseRole) {
              this.logger.log('No Franchise role found globally — creating one');
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
              { name: centerPayload.franchiseName, email: dto.email },
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
    const updatePayload: Partial<Center> = {
      franchiseName: (dto as any).franchiseName ?? (dto as any).name,
      ownerName: (dto as any).ownerName,
      email: (dto as any).email,
      contactNumber: (dto as any).contactNumber ?? (dto as any).phone,
      alternateNumber: (dto as any).alternateNumber,
      address: (dto as any).address,
      city: (dto as any).city,
      state: (dto as any).state,
      pincode: (dto as any).pincode,
      registrationNumber: (dto as any).registrationNumber,
      gstNumber: (dto as any).gstNumber,
      agreementStartDate: dto.agreementStartDate ? new Date(dto.agreementStartDate) : undefined,
      agreementEndDate: dto.agreementEndDate ? new Date(dto.agreementEndDate) : undefined,
      isActive: (dto as any).isActive,
    };

    await this.centerRepo.update(id, updatePayload as any);
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
