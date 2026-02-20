"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const apiToken_service_1 = require("./apiToken.service");
const luxon_1 = require("luxon");
const User_1 = require("../../entities/User");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const mail_service_1 = require("../global/mail.service");
const Role_1 = require("../../entities/Role");
const AppSetting_1 = require("../../entities/AppSetting");
const ApiToken_1 = require("../../entities/ApiToken");
const argon2 = __importStar(require("argon2"));
const otp_service_1 = require("../global/otp.service");
const Organization_1 = require("../../entities/Organization");
let AuthService = class AuthService {
    constructor(userRepository, otpService, mailService, jwtService, apiToken) {
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.apiToken = apiToken;
    }
    async sendVerifyEmailOtp(email) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const setting = await manager.findOne(AppSetting_1.AppSetting, {
                where: { id: 1 },
            });
            const user = await manager.findOne(User_1.User, {
                where: { email: email ?? null },
            });
            if (user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.DUPLICATE_EMAIL_INPUT, { email });
            }
            const existingOtp = await manager.findOne(User_1.Otp, {
                where: {
                    email,
                    createdAt: new Date(new Date().getTime() - 5 * 60 * 1000),
                },
            });
            if (existingOtp) {
                await queryRunner.commitTransaction();
                return {
                    otpGeneratedSuccessfully: true,
                    otp: existingOtp.otp,
                    message: 'OTP already generated',
                };
            }
            const otp = await this.otpService.generateOtp({ email }, manager, 'verify-email', 5);
            if (otp !== null) {
                this.mailService.sendMailVerify(otp, email, user, setting);
            }
            await queryRunner.commitTransaction();
            return { otpGeneratedSuccessfully: true, otp, message: 'OTP sent' };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async register(registerDto) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const setting = await manager.findOne(AppSetting_1.AppSetting, { where: { id: 1 } });
            const otpEntity = await manager.findOne(User_1.Otp, {
                where: {
                    email: registerDto.email,
                    otpType: 'verify-email',
                    otp: registerDto.emailOTP,
                },
            });
            if (!otpEntity) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_OTP_INPUT, {
                    otp: registerDto.emailOTP,
                });
            }
            const existingUser = await manager.findOne(User_1.User, {
                where: { email: registerDto.email ?? null },
            });
            if (existingUser) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.DUPLICATE_EMAIL_INPUT, {
                    email: registerDto.email,
                });
            }
            const org = await manager.save(manager.create(Organization_1.Organization, {
                name: registerDto.organizationName,
                description: 'Organization description',
                status: 'active',
            }));
            const role = await manager.findOne(Role_1.Role, {
                where: { name: 'primary_organization_admin_role' },
                relations: ['permissions'],
            });
            const roles = await manager.save(manager.create(Role_1.Role, {
                ...role,
                id: undefined,
                isPrimary: true,
                name: 'Organization Admin',
                status: 'active',
                organizationId: org.id,
            }));
            const roleEmp = await manager.findOne(Role_1.Role, {
                where: { name: 'primary_organization_employee_role' },
                relations: ['permissions'],
            });
            await manager.save(manager.create(Role_1.Role, {
                ...roleEmp,
                id: undefined,
                isPrimary: false,
                name: 'Organization Employee',
                status: 'active',
                organizationId: org.id,
            }));
            const newUser = manager.create(User_1.User, {
                ...registerDto,
                password: registerDto.password,
                status: 'active',
                roles: [roles],
                organizationId: org.id,
                userType: User_1.UserType.organization,
                designation: User_1.Designation.SUPER_ADMIN,
            });
            await queryRunner.manager.save(newUser);
            await queryRunner.manager.delete(User_1.Otp, otpEntity.id);
            try {
                this.mailService.welcomeMail(registerDto.email, newUser, setting);
            }
            catch (error) {
            }
            await queryRunner.commitTransaction();
            const payload = { sub: newUser.id, email: newUser.email };
            const expiry = luxon_1.DateTime.now().plus({ days: 60 }).toJSDate();
            const token = await this.apiToken.generateJwtToken(newUser.id, expiry);
            const tokenId = token.token;
            const accessToken = this.jwtService.sign({
                username: newUser.email,
                sub: newUser.id,
                tokenId,
            });
            await this.otpService.deleteOtp({
                email: registerDto.email,
                otp: registerDto.emailOTP,
                password: registerDto.password,
            }, manager);
            const allPermissions = newUser.roles.reduce((acc, role) => {
                return [...acc, ...role.permissions.map((p) => p.slug)];
            }, []);
            newUser.permissions = allPermissions;
            newUser.roles = newUser.roles.map((role) => {
                delete role.permissions;
                return role;
            });
            return { user: newUser, accessToken };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async requestOtp(requestOtp, userType) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const setting = await manager.findOne(AppSetting_1.AppSetting, {
                where: { id: 1 },
            });
            if (setting?.otpSMS || setting?.otpEmail) {
                if (!requestOtp?.email || !requestOtp?.password) {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_USER_AND_PASSWORD);
                }
                const user = await manager.findOne(User_1.User, {
                    where: {
                        email: requestOtp?.email ?? null,
                        status: 'active',
                        ...(userType ? { userType: userType } : {}),
                    },
                    select: ['id', 'email', 'password', 'name', 'username', 'userType'],
                });
                if (!user) {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, {
                        email: requestOtp?.email,
                    });
                }
                const isPasswordValid = await argon2.verify(user.password, requestOtp.password);
                if (!isPasswordValid) {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_PASSWORD_INPUT, {
                        password: requestOtp?.password,
                    });
                }
                const otp = await this.otpService.generateOtp(requestOtp, manager, 'login', 5);
                try {
                    this.mailService.sendOtpMail(otp, requestOtp.email, user, setting);
                }
                catch (error) {
                }
                await queryRunner.commitTransaction();
                return {
                    otpGeneratedSuccessfully: true,
                    otp: 123456,
                    message: 'OTP sent to your email',
                };
            }
            else {
                return {
                    otpGeneratedSuccessfully: false,
                    otp: null,
                    message: 'OTP is not enabled in the settings or no settings found',
                };
            }
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async validateOtp(validateDto, userType) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const setting = await manager.findOne(AppSetting_1.AppSetting, {
                where: { id: 1 },
            });
            const user = await manager.findOne(User_1.User, {
                where: {
                    email: validateDto?.email ?? null,
                    ...(userType ? { userType: userType } : {}),
                },
                relations: ['roles', 'roles.permissions'],
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, { email: validateDto?.email });
            }
            const userWithPassword = await manager.findOne(User_1.User, {
                where: { id: user?.id },
                select: ['id', 'password'],
            });
            if (user.status === 'pending') {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_ACTIVATION_IS_PENDING);
            }
            if (user.status === 'inactive') {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_IS_INACTIVE, {
                    email: validateDto?.email,
                });
            }
            if (user.status === 'blocked') {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_IS_BLOCKED, { email: validateDto?.email });
            }
            const isPasswordValid = await argon2.verify(userWithPassword.password, validateDto.password);
            if (!isPasswordValid) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_PASSWORD_INPUT, {
                    password: validateDto?.password,
                });
            }
            if (setting?.otpSMS || setting?.otpEmail) {
                const isOtpValid = await this.otpService.verifyOtp(validateDto, manager);
                if (!isOtpValid) {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_OTP_INPUT, { otp: validateDto?.otp });
                }
            }
            const expiry = luxon_1.DateTime.now().plus({ days: 60 }).toJSDate();
            const token = await this.apiToken.generateJwtToken(user.id, expiry);
            const tokenId = token.token;
            const accessToken = this.jwtService.sign({
                username: user.email,
                sub: user.id,
                tokenId,
            });
            await this.otpService.deleteOtp(validateDto, manager);
            const allPermissions = user.roles.reduce((acc, role) => {
                return [...acc, ...role.permissions.map((p) => p.slug)];
            }, []);
            user.permissions = allPermissions;
            user.roles = user.roles.map((role) => {
                delete role.permissions;
                return role;
            });
            await queryRunner.commitTransaction();
            return { user, accessToken };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async logout(accessToken) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const decoded = this.jwtService.decode(accessToken);
            if (!decoded) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_TOKEN);
            }
            const user = await manager.findOne(User_1.User, {
                where: { email: decoded.username },
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, { email: decoded.username });
            }
            const jwtAuthWhitelist = await manager.findOne(ApiToken_1.ApiToken, {
                where: { token: decoded.tokenId },
            });
            if (!jwtAuthWhitelist) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.AUTH_TOKEN_NOT_FOUND);
            }
            await manager.delete(ApiToken_1.ApiToken, jwtAuthWhitelist);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async resetPassword(validateDto, newPassword) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const user = await manager.findOne(User_1.User, {
                where: { email: validateDto?.email ?? null },
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, { email: validateDto?.email });
            }
            const isOtpValid = await this.otpService.verifyOtp(validateDto, manager);
            if (!isOtpValid) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_OTP_INPUT, { otp: validateDto?.otp });
            }
            const hashedPassword = await argon2.hash(newPassword);
            await manager.update(User_1.User, user.id, { password: hashedPassword });
            await this.otpService.deleteOtp(validateDto, manager);
            await queryRunner.commitTransaction();
            return user;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async forgotPassword(email) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const setting = await manager.findOne(AppSetting_1.AppSetting, {
                where: { id: 1 },
            });
            const user = await manager.findOne(User_1.User, {
                where: { email: email ?? null },
            });
            if (!user) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND, { email });
            }
            const otp = await this.otpService.generateOtp({ email }, manager, 'forgot-password', 5);
            this.mailService.sendForgotPasswordMail(otp, email, user, setting);
            await queryRunner.commitTransaction();
            return { otpGeneratedSuccessfully: true, otp, message: 'OTP sent' };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        otp_service_1.OtpService,
        mail_service_1.MailService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, apiToken_service_1.ApiTokenService])
], AuthService);
//# sourceMappingURL=auth.service.js.map