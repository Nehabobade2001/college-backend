import { AuthService } from './auth.service';
import { RequestOtpDto, VerifyOtpDto, ForgotPasswordDto, ResetPasswordDto } from './auth-controller.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    adminRequestOtp(requestOtpDto: RequestOtpDto): Promise<import("../../entities/User").OtpRes>;
    adminVerifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
        data: {
            user: import("../../entities/User").User;
            accessToken: string;
        };
    }>;
    franchiseRequestOtp(requestOtpDto: RequestOtpDto): Promise<import("../../entities/User").OtpRes>;
    franchiseVerifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
        data: {
            user: import("../../entities/User").User;
            accessToken: string;
        };
    }>;
    studentRequestOtp(requestOtpDto: RequestOtpDto): Promise<import("../../entities/User").OtpRes>;
    studentVerifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{
        message: string;
        data: {
            user: import("../../entities/User").User;
            accessToken: string;
        };
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<import("../../entities/User").OtpRes>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
        data: import("../../entities/User").User;
    }>;
    logout(authorization: string): Promise<{
        message: string;
    }>;
    getProfile(req: any): Promise<{
        message: string;
        data: any;
    }>;
    adminDashboard(): Promise<{
        message: string;
    }>;
    franchiseDashboard(): Promise<{
        message: string;
    }>;
    studentDashboard(): Promise<{
        message: string;
    }>;
}
