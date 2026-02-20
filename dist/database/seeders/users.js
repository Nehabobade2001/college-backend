"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeeder = void 0;
const Organization_1 = require("../../entities/Organization");
const Role_1 = require("../../entities/Role");
const PermissionConst_1 = require("../../common/const/PermissionConst");
const Permissions_1 = require("../../entities/Permissions");
const User_1 = require("../../entities/User");
const AppSetting_1 = require("../../entities/AppSetting");
const ApiToken_1 = require("../../entities/ApiToken");
const GetAllPermissions = () => {
    const PermissionValues = Object.values(PermissionConst_1.PermissionConst);
    const PermissionKeys = Object.keys(PermissionConst_1.PermissionConst);
    return PermissionValues.map((permission, index) => ({
        ...permission,
        slug: PermissionKeys[index],
        appName: permission.app,
        groupName: permission.group,
    }));
};
const UserSeeder = async (AppDataSource) => {
    const userRepo = AppDataSource.getRepository(User_1.User);
    const organizationRepo = AppDataSource.getRepository(Organization_1.Organization);
    const roleRepo = AppDataSource.getRepository(Role_1.Role);
    const permissionsRepo = AppDataSource.getRepository(Permissions_1.Permissions);
    const appSettingsRepository = AppDataSource.getRepository(AppSetting_1.AppSetting);
    const apiTokenRepo = AppDataSource.getRepository(ApiToken_1.ApiToken);
    await apiTokenRepo.clear();
    await organizationRepo.delete({});
    const organization = await organizationRepo.save(organizationRepo.create({
        name: 'Test Organization',
        description: 'Test Organization Description',
    }));
    await permissionsRepo.delete({});
    const permissions = await permissionsRepo.save(permissionsRepo.create(GetAllPermissions()));
    await roleRepo.delete({});
    const [AdminRole] = await roleRepo.save(roleRepo.create([
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
    ]));
    await userRepo.delete({});
    const users = [
        {
            name: 'Admin',
            username: 'admin',
            email: 'admin@newrise.in',
            mobileNo: 9876543210,
            status: 'active',
            password: 'Password@123',
            avatar: 'avatar',
            userType: User_1.UserType.admin,
            designation: User_1.Designation.CEO,
            isPrimary: true,
            parentId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
            organizationId: organization.id,
            roles: [AdminRole],
        },
    ];
    await userRepo.save(userRepo.create(users));
    await appSettingsRepository.delete({});
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
    });
    await appSettingsRepository.save(appSettings);
};
exports.UserSeeder = UserSeeder;
//# sourceMappingURL=users.js.map