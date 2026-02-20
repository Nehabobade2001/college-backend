import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    welcomeMail(to: string, user: object, setting: object): Promise<void>;
    sendMailVerify(code: number, to: string, setting: object, user: object): Promise<void>;
    sendOtpMail(code: number, to: string, user: object, setting: object): Promise<void>;
    sendForgotPasswordMail(code: number, to: string, user: object, setting: object): Promise<void>;
}
