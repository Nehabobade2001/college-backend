import { Organization } from '@/entities/Organization'
import { Role } from '@/entities/Role'
import { DataSource } from 'typeorm'
import { PermissionConst } from '../../common/const/PermissionConst'
import { Permissions } from '@/entities/Permissions'
import { Designation, User, UserType } from '@/entities/User'
import { AppSetting } from '@/entities/AppSetting'
import { ApiToken } from '@/entities/ApiToken'

const GetAllPermissions = () => {
  const PermissionValues = Object.values(PermissionConst)
  const PermissionKeys = Object.keys(PermissionConst)

  return PermissionValues.map((permission, index) => ({
    ...permission,
    slug: PermissionKeys[index],
    appName: permission.app,
    groupName: permission.group,
  }))
}

export const UserSeeder = async (AppDataSource: DataSource) => {
  const userRepo = AppDataSource.getRepository(User)
  const organizationRepo = AppDataSource.getRepository(Organization)
  const roleRepo = AppDataSource.getRepository(Role)
  const permissionsRepo = AppDataSource.getRepository(Permissions)
  const appSettingsRepository = AppDataSource.getRepository(AppSetting)
  const apiTokenRepo = AppDataSource.getRepository(ApiToken)

  // clear all data
  await apiTokenRepo.clear()

  //fix for api token seeder

  // clear organization
  await organizationRepo.delete({})

  // create organization
  const organization = await organizationRepo.save(
    organizationRepo.create({
      name: 'Test Organization',
      description: 'Test Organization Description',
    }),
  )

  // clear permissions
  await permissionsRepo.delete({})

  // create permissions
  const permissions = await permissionsRepo.save(
    permissionsRepo.create(GetAllPermissions()),
  )

  // clear roles
  await roleRepo.delete({})

  // create roles
  const [AdminRole] = await roleRepo.save(
    roleRepo.create([
      {
        name: 'Admin',
        organizationId: organization.id,
        description: 'Admin Role',
        isPrimary: true,
        roleType: 'admin',
        status: 'active',
        permissions: permissions,
      },
      {
        name: 'primary_organization_admin_role',
        organizationId: organization.id,
        description: 'Organization Admin Role',
        isPrimary: true,
        roleType: 'organization-admin',
        status: 'active',
        permissions: permissions,
      },
      {
        name: 'primary_organization_employee_role',
        organizationId: organization.id,
        description: 'Organization Employee Role',
        isPrimary: true,
        roleType: 'organization-employee',
        status: 'active',
        permissions: permissions,
      },
    ]),
  )

  // clear users
  await userRepo.delete({})

  // Create users data
  const users: Partial<User>[] = [
    {
      name: 'Admin',
      username: 'admin',
      email: 'admin@newrise.in',
      mobileNo: 9876543210,
      status: 'active',
      password: 'Password@123',
      avatar: 'avatar',
      userType: UserType.admin,
      designation: Designation.CEO,
      isPrimary: true,
      parentId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      organizationId: organization.id,
      roles: [AdminRole],
    },
  ]

  // Save users to the database
  await userRepo.save(userRepo.create(users))

  // clear app settings
  await appSettingsRepository.delete({})

  // Create App Settings
  const appSettings = appSettingsRepository.create({
    title: 'Admin Application',
    description: 'Admin Application Software',
    logo: '/public/uploads/1735040504980.png',
    favicon: '/public/uploads/1735040504980.png',
    coverImage: '/public/uploads/1735040504985.jpg',
    copyRight: '© 2024-25',
    supportEmail: 'support@gmail.com',
    supportPhone: 9876543210,
    twoFactorAuth: true,
    otpSMS: false,
    otpEmail: true,
    captcha: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  })

  // save app settings
  await appSettingsRepository.save(appSettings)
}
