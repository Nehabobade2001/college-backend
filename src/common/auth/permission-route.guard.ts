import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@/entities/User'
import { Permissions } from '@/entities/Permissions'

/**
 * PermissionRouteGuard
 *
 * Checks whether the currently authenticated user has a permission whose
 * `httpMethod` and `route` match the incoming request.
 *
 * Usage – apply on any controller or handler:
 *
 *   @UseGuards(JwtAuthGuard, PermissionRouteGuard)
 *   @Get('some-path')
 *   async someHandler() { ... }
 *
 * The guard automatically reads the HTTP method (GET, POST, …) and the
 * matched route pattern (e.g. "/subjects/:id") from the request and checks
 * whether any role assigned to the user owns a permission that has exactly
 * those values stored in the `permissions` table.
 *
 * If no permission row is found for that route, the guard ALLOWS the request
 * (fail-open) so that unregistered routes are not accidentally blocked.
 * Change the early-return to `false` if you prefer fail-closed behaviour.
 */
@Injectable()
export class PermissionRouteGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Permissions)
        private readonly permissionRepository: Repository<Permissions>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<{
            user?: { sub: number }
            method: string
            route?: { path: string }
            path: string
        }>()

        const user = request.user
        if (!user) {
            throw new ForbiddenException('Not authenticated')
        }

        // Use the matched route pattern (e.g. "/subjects/:id") when available,
        // otherwise fall back to the raw request path.
        const routePath: string = request.route?.path ?? request.path
        const httpMethod: string = request.method.toUpperCase()

        // Look up the permission row that maps to this route
        const permission = await this.permissionRepository.findOne({
            where: { httpMethod, route: routePath },
            relations: ['roles'],
        })

        // No permission row registered for this route → allow (fail-open)
        if (!permission) {
            return true
        }

        // Load user with their roles → permissions
        const userWithRoles = await this.userRepository.findOne({
            where: { id: user.sub },
            relations: ['roles', 'roles.permissions'],
        })

        if (!userWithRoles) {
            throw new ForbiddenException('User not found')
        }

        // Check whether any of the user's role permissions matches the found permission
        const hasPermission = userWithRoles.roles.some((role) =>
            role.permissions?.some((p) => p.id === permission.id),
        )

        if (!hasPermission) {
            throw new ForbiddenException(
                `You do not have permission to access ${httpMethod} ${routePath}`,
            )
        }

        return true
    }
}
