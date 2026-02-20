import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/Roles.decorator';
import { throwGqlError } from '../helpers/GraphQLErrorHandling';
import { ErrorCodes } from '../const/ErrorCodes';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throwGqlError(ErrorCodes.UNAUTHORIZED);
    }

    const userWithRoles = await this.userRepository.findOne({
      where: { id: user.sub },
      relations: ['roles'],
    });

    if (!userWithRoles) {
      throwGqlError(ErrorCodes.USER_NOT_FOUND);
    }

    const hasRole = userWithRoles.roles.some((role) =>
      requiredRoles.includes(role.name),
    );

    if (!hasRole) {
      throwGqlError(ErrorCodes.FORBIDDEN);
    }

    return true;
  }
}
