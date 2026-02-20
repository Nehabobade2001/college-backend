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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async welcomeMail(to, user, setting) {
        await this.mailerService
            .sendMail({
            to,
            subject: 'Welcome Mail for Successful Registration in Nest MailerModule ✔',
            template: 'Welcome.hbs',
            context: {
                user,
                setting,
            },
        })
            .then(() => {
            console.log('Email sent');
        })
            .catch((e) => {
            console.log('Email failed', e);
        });
    }
    async sendMailVerify(code, to, setting, user) {
        await this.mailerService
            .sendMail({
            to,
            subject: 'Verification Email OTP in Nest MailerModule ✔',
            template: 'VerifyEmail.hbs',
            context: {
                code,
                email: to,
                setting,
                user,
            },
        })
            .then(() => {
            console.log('Email with OTP sent');
        })
            .catch((e) => {
            console.log('Email failed', e);
        });
    }
    async sendOtpMail(code, to, user, setting) {
        await this.mailerService
            .sendMail({
            to,
            subject: 'Testing Meeting - Follow - UP for Meeting in Nest MailerModule ✔',
            template: 'RequestOtp.hbs',
            context: {
                code,
                user,
                setting,
            },
        })
            .then(() => {
            console.log('Email with OTP sent');
        })
            .catch((e) => {
            console.log('Email failed', e);
        });
    }
    async sendForgotPasswordMail(code, to, user, setting) {
        await this.mailerService
            .sendMail({
            to,
            subject: 'Forgot Password OTP in Nest MailerModule ✔',
            template: 'ForgotPassword.hbs',
            context: {
                code,
                user,
                setting,
            },
        })
            .then(() => {
            console.log('Email with OTP sent in meeting');
        })
            .catch((e) => {
            console.log('Email failed ', e);
        });
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map