import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ApiTokenService } from '@/modules/auth/apiToken.service';
declare const JwtAuthGuard_base: any;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private reflector;
    private jwtService;
    private apiTokenService;
    constructor(reflector: Reflector, jwtService: JwtService, apiTokenService: ApiTokenService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
