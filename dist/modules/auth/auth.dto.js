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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = exports.ForgetPasswordDto = exports.ResetPasswordDto = exports.ValidateDto = exports.OtpRequestDto = exports.LoginDto = void 0;
const class_validator_1 = require("class-validator");
let IsSixDigitOtp = class IsSixDigitOtp {
    validate(value) {
        return value >= 100000 && value <= 999999;
    }
    defaultMessage() {
        return 'OTP must be exactly 6 digits';
    }
};
IsSixDigitOtp = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'IsSixDigitOtp', async: false })
], IsSixDigitOtp);
class LoginDto {
}
exports.LoginDto = LoginDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
        message: 'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Validate)(IsSixDigitOtp),
    __metadata("design:type", Number)
], LoginDto.prototype, "otp", void 0);
class OtpRequestDto {
}
exports.OtpRequestDto = OtpRequestDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], OtpRequestDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
        message: 'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], OtpRequestDto.prototype, "password", void 0);
class ValidateDto {
}
exports.ValidateDto = ValidateDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], ValidateDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
        message: 'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], ValidateDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Validate)(IsSixDigitOtp),
    __metadata("design:type", Number)
], ValidateDto.prototype, "otp", void 0);
class ResetPasswordDto {
}
exports.ResetPasswordDto = ResetPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Validate)(IsSixDigitOtp),
    __metadata("design:type", Number)
], ResetPasswordDto.prototype, "otp", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
        message: 'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "newPassword", void 0);
class ForgetPasswordDto {
}
exports.ForgetPasswordDto = ForgetPasswordDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email format' }),
    __metadata("design:type", String)
], ForgetPasswordDto.prototype, "email", void 0);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RegisterDto.prototype, "mobileNo", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "avatar", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
        message: 'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RegisterDto.prototype, "createdBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RegisterDto.prototype, "roleId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Validate)(IsSixDigitOtp),
    __metadata("design:type", Number)
], RegisterDto.prototype, "emailOTP", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "organizationName", void 0);
//# sourceMappingURL=auth.dto.js.map