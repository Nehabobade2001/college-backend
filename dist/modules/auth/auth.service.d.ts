import { JwtService } from '@nestjs/jwt';
import { ApiTokenService } from './apiToken.service';
import { OtpRes, User } from '@/entities/User';
import { Repository } from 'typeorm';
import { MailService } from '../global/mail.service';
import { OtpRequestDto, RegisterDto, ValidateDto } from './auth.dto';
import { OtpService } from '../global/otp.service';
export declare class AuthService {
    private readonly userRepository;
    private readonly otpService;
    private readonly mailService;
    private jwtService;
    private apiToken;
    constructor(userRepository: Repository<User>, otpService: OtpService, mailService: MailService, jwtService: JwtService, apiToken: ApiTokenService);
    sendVerifyEmailOtp(email: string): Promise<OtpRes>;
    register(registerDto: RegisterDto): Promise<{
        user: User;
        accessToken: string;
    }>;
    requestOtp(requestOtp: OtpRequestDto, userType?: string): Promise<OtpRes>;
    validateOtp(validateDto: ValidateDto, userType?: string): Promise<{
        user: User;
        accessToken: string;
    }>;
    logout(accessToken: string): Promise<boolean>;
    resetPassword(validateDto: ValidateDto, newPassword: string): Promise<User>;
    forgotPassword(email: string): Promise<OtpRes>;
}
