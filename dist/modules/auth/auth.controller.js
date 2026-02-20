"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_dto_1 = require("./auth-controller.dto");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const roles_guard_1 = require("../../common/auth/roles.guard");
const Roles_decorator_1 = require("../../common/decorators/Roles.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async adminRequestOtp(requestOtpDto) {
        return await this.authService.requestOtp(requestOtpDto, 'admin');
    }
    async adminVerifyOtp(verifyOtpDto) {
        const result = await this.authService.validateOtp({
            email: verifyOtpDto.email,
            password: verifyOtpDto.password,
            otp: verifyOtpDto.otp,
        }, 'admin');
        return {
            message: 'Login successful',
            data: result,
        };
    }
    async franchiseRequestOtp(requestOtpDto) {
        return await this.authService.requestOtp(requestOtpDto, 'franchise');
    }
    async franchiseVerifyOtp(verifyOtpDto) {
        const result = await this.authService.validateOtp({
            email: verifyOtpDto.email,
            password: verifyOtpDto.password,
            otp: verifyOtpDto.otp,
        }, 'franchise');
        return {
            message: 'Login successful',
            data: result,
        };
    }
    async studentRequestOtp(requestOtpDto) {
        return await this.authService.requestOtp(requestOtpDto, 'student');
    }
    async studentVerifyOtp(verifyOtpDto) {
        const result = await this.authService.validateOtp({
            email: verifyOtpDto.email,
            password: verifyOtpDto.password,
            otp: verifyOtpDto.otp,
        }, 'student');
        return {
            message: 'Login successful',
            data: result,
        };
    }
    async forgotPassword(forgotPasswordDto) {
        return await this.authService.forgotPassword(forgotPasswordDto.email);
    }
    async resetPassword(resetPasswordDto) {
        const result = await this.authService.resetPassword({
            email: resetPasswordDto.email,
            otp: resetPasswordDto.otp,
            password: '',
        }, resetPasswordDto.newPassword);
        return {
            message: 'Password reset successful',
            data: result,
        };
    }
    async logout(authorization) {
        const token = authorization.split(' ')[1];
        await this.authService.logout(token);
        return {
            message: 'Logout successful',
        };
    }
    async getProfile(req) {
        return {
            message: 'Profile fetched successfully',
            data: req.user,
        };
    }
    async adminDashboard() {
        return {
            message: 'Welcome to Admin Dashboard',
        };
    }
    async franchiseDashboard() {
        return {
            message: 'Welcome to Franchise Dashboard',
        };
    }
    async studentDashboard() {
        return {
            message: 'Welcome to Student Dashboard',
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('admin/request-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_dto_1.RequestOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminRequestOtp", null);
__decorate([
    (0, common_1.Post)('admin/verify-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminVerifyOtp", null);
__decorate([
    (0, common_1.Post)('franchise/request-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_dto_1.RequestOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "franchiseRequestOtp", null);
__decorate([
    (0, common_1.Post)('franchise/verify-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "franchiseVerifyOtp", null);
__decorate([
    (0, common_1.Post)('student/request-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_dto_1.RequestOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "studentRequestOtp", null);
__decorate([
    (0, common_1.Post)('student/verify-otp'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_dto_1.VerifyOtpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "studentVerifyOtp", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_controller_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('admin/dashboard'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, Roles_decorator_1.Roles)('Admin', 'Organization Admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminDashboard", null);
__decorate([
    (0, common_1.Get)('franchise/dashboard'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, Roles_decorator_1.Roles)('Franchise', 'Organization Admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "franchiseDashboard", null);
__decorate([
    (0, common_1.Get)('student/dashboard'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, Roles_decorator_1.Roles)('Student', 'Organization Employee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "studentDashboard", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map