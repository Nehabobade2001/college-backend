export declare class LoginDto {
    email: string;
    password: string;
    otp: number;
}
export declare class OtpRequestDto {
    email: string;
    password: string;
}
export declare class ValidateDto {
    email: string;
    password: string;
    otp: number;
}
export declare class ResetPasswordDto {
    email: string;
    otp: number;
    newPassword: string;
}
export declare class ForgetPasswordDto {
    email: string;
}
export declare class RegisterDto {
    name: string;
    mobileNo?: number;
    email: string;
    status?: 'active' | 'inactive' | 'blocked' | 'pending';
    avatar?: string;
    password: string;
    createdBy?: number | null;
    roleId: number;
    emailOTP: number;
    organizationName: string;
}
