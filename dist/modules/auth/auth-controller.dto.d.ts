export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RequestOtpDto {
    email: string;
    password: string;
}
export declare class VerifyOtpDto {
    email: string;
    password: string;
    otp: number;
}
export declare class ForgotPasswordDto {
    email: string;
}
export declare class ResetPasswordDto {
    email: string;
    otp: number;
    newPassword: string;
}
