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
exports.OtpService = void 0;
const User_1 = require("../../entities/User");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let OtpService = class OtpService {
    constructor(otpRepository) {
        this.otpRepository = otpRepository;
    }
    async generateOtp(otpRequestDto, manager, type, time) {
        const existingOtp = await manager.findOne(User_1.Otp, {
            where: {
                email: otpRequestDto.email,
                createdAt: (0, typeorm_2.MoreThan)(new Date(new Date().getTime() - time * 60000)),
            },
        });
        if (existingOtp) {
            return null;
        }
        const otp = 123456;
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);
        const otpEntity = manager.create(User_1.Otp, {
            otp,
            email: otpRequestDto.email,
            otpType: type,
            expiresAt,
        });
        await manager.save(otpEntity);
        return otp;
    }
    async verifyOtp(loginDto, manager) {
        const otpEntity = await manager.findOne(User_1.Otp, {
            where: {
                otp: loginDto?.otp,
                email: loginDto?.email,
                otpType: 'login',
            },
        });
        if (otpEntity) {
            const now = new Date();
            const otpExpiresAt = new Date(otpEntity.expiresAt);
            if (otpExpiresAt.getTime() > now.getTime()) {
                await this.otpRepository.delete(otpEntity.id);
                return true;
            }
            else {
                await this.otpRepository.delete(otpEntity.id);
            }
        }
        return false;
    }
    async generateOtpForPasswordReset(forgetPasswordDto) {
        const otp = 123456;
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);
        const otpEntity = this.otpRepository.create({
            otp,
            email: forgetPasswordDto.email,
            expiresAt,
        });
        await this.otpRepository.save(otpEntity);
        return otp;
    }
    async verifyOtpForPasswordReset(email, otp) {
        const otpEntity = await this.otpRepository.findOne({
            where: { email, otp },
        });
        if (otpEntity) {
            const now = new Date();
            const otpExpiresAt = new Date(otpEntity.expiresAt);
            if (otpExpiresAt.getTime() > now.getTime()) {
                await this.otpRepository.delete(otpEntity.id);
                return true;
            }
            else {
                await this.otpRepository.delete(otpEntity.id);
            }
        }
        return false;
    }
    async deleteOtp(loginDto, manager) {
        const oldOtp = await manager.findOne(User_1.Otp, {
            where: {
                email: loginDto.email,
                createdAt: (0, typeorm_2.LessThan)(new Date(new Date().getTime() - 5 * 60000)),
            },
        });
        if (oldOtp) {
            await manager.delete(User_1.Otp, oldOtp.id);
        }
        await manager.delete(User_1.Otp, {
            otp: loginDto.otp,
            email: loginDto.email,
        });
    }
    async deleteOtpOfReset(otp, email) {
        await this.otpRepository.delete({
            otp: otp,
            email: email,
        });
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.Otp)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OtpService);
//# sourceMappingURL=otp.service.js.map