import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    Query,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
    UseGuards,
    BadRequestException,
} from '@nestjs/common'
import { PermissionService } from './permission.service'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { RolesGuard } from '@/common/auth/roles.guard'
import { Roles } from '@/common/decorators/Roles.decorator'

@Controller('permissions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Organization Admin')
export class PermissionController {
    constructor(private readonly permissionService: PermissionService) { }

    @Get()
    async findAll() {
        const result = await this.permissionService.listWithPagination({
            page: 1,
            limit: 500,
            sortBy: [['createdAt', 'DESC']],
            search: undefined,
            filter: undefined,
            path: 'permissions',
            select: [],
        } as any)
        return {
            message: 'Permissions fetched successfully',
            data: result.data,
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const permission = await this.permissionService.findById(id)
        return {
            message: 'Permission fetched successfully',
            data: permission,
        }
    }

    // Check if a user has a permission for a given route (method + path)
    // GET /permissions/check-route?method=GET&route=/some/path
    @Get('check-route')
    async checkRoutePermission(
        @Query('method') method: string,
        @Query('route') route: string,
    ) {
        if (!method || !route) {
            throw new BadRequestException('method and route query params are required')
        }
        const permission = await this.permissionService.findByRoute(method.toUpperCase(), route)
        return {
            message: permission ? 'Permission found for route' : 'No permission mapped to this route',
            data: permission ?? null,
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body()
        body: {
            appName: string
            module: string
            action: string
            description: string
            httpMethod?: string
            route?: string
        },
    ) {
        const permission = await this.permissionService.create(body as any)
        return {
            message: 'Permission created successfully',
            data: permission,
        }
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body()
        body: {
            appName?: string
            module?: string
            action?: string
            description?: string
            httpMethod?: string
            route?: string
        },
    ) {
        const permission = await this.permissionService.update(id, body as any)
        return {
            message: 'Permission updated successfully',
            data: permission,
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.permissionService.remove(id)
    }
}
