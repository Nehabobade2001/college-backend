import { ApiToken } from '@/entities/ApiToken';
import { User } from '@/entities/User';
import { Repository } from 'typeorm';
export declare class ApiTokenService {
    private apiTokenRepository;
    private userRepository;
    constructor(apiTokenRepository: Repository<ApiToken>, userRepository: Repository<User>);
    generateJwtToken(userId: number, expiresAt: Date): Promise<ApiToken>;
    verifyTokenAndPermissions(token: string, permissions?: string[]): Promise<{
        error: boolean;
        message?: string;
        code?: string;
        user: User | null;
    }>;
}
