import { AuthService } from './auth.service';
import { LoginRes, OtpRes, User } from '@/entities/User';
import { OtpRequestDto, RegisterDto, ValidateDto } from './auth.dto';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    sendRegistrationOtp(email: string): Promise<OtpRes>;
    register(registerData: RegisterDto): Promise<LoginRes>;
    requestOtp(otpRequestData: OtpRequestDto): Promise<OtpRes>;
    login(loginData: ValidateDto): Promise<LoginRes>;
    logout(req: any): Promise<boolean>;
    resetPassword(validateDto: ValidateDto, newPassword: string): Promise<User>;
    forgotPassword(email: string): Promise<OtpRes>;
}
