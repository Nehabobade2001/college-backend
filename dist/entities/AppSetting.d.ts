export declare class AppSetting {
    id: number;
    title: string;
    description: string;
    logo: string;
    favicon: string;
    coverImage: string;
    copyRight: string;
    supportEmail: string;
    supportPhone: number;
    twoFactorAuth?: boolean;
    otpSMS?: boolean;
    otpEmail?: boolean;
    captcha?: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
