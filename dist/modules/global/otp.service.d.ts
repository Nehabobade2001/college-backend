import { Otp } from '@/entities/User';
import { EntityManager, Repository } from 'typeorm';
import { ForgetPasswordDto, LoginDto, OtpRequestDto, ValidateDto } from '../auth/auth.dto';
export declare class OtpService {
    private readonly otpRepository;
    constructor(otpRepository: Repository<Otp>);
    generateOtp(otpRequestDto: Partial<OtpRequestDto>, manager: EntityManager, type: 'login' | 'register' | 'reset-password' | 'verify-email' | 'forgot-password' | 'change-password', time: number): Promise<number | null>;
    verifyOtp(loginDto: LoginDto, manager: EntityManager): Promise<boolean>;
    generateOtpForPasswordReset(forgetPasswordDto: ForgetPasswordDto): Promise<number>;
    verifyOtpForPasswordReset(email: string, otp: number): Promise<boolean>;
    deleteOtp(loginDto: ValidateDto, manager: EntityManager): Promise<void>;
    deleteOtpOfReset(otp: number, email: string): Promise<void>;
}
