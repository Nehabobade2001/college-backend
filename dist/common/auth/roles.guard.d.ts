import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@/entities/User';
import { Repository } from 'typeorm';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private userRepository;
    constructor(reflector: Reflector, userRepository: Repository<User>);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
