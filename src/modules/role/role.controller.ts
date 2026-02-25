import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
    UseGuards,
} from '@nestjs/common'
import { RoleService } from './role.service'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { RolesGuard } from '@/common/auth/roles.guard'
import { Roles } from '@/common/decorators/Roles.decorator'
import { CurrentUser } from '@/common/decorators/CurrentUser'
import { User } from '@/entities/User'

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Organization Admin')
export class RoleController {
    constructor(private readonly roleService: RoleService) { }

    @Get()
    async findAll() {
        // Use listWithPagination with a default query to get all roles
        const result = await this.roleService.listWithPagination({
            page: 1,
            limit: 200,
            sortBy: [['createdAt', 'DESC']],
            search: undefined,
            filter: undefined,
            path: 'roles',
            select: [],
        } as any)
        return {
            message: 'Roles fetched successfully',
            data: result.data,
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const role = await this.roleService.findById(id)
        return {
            message: 'Role fetched successfully',
            data: role,
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body() body: { name: string; description?: string; permissionIds?: number[] },
        @CurrentUser() user: User,
    ) {
        const role = await this.roleService.create(
            {
                name: body.name,
                description: body.description,
                permissionIds: body.permissionIds || [],
            } as any,
            user,
        )
        return {
            message: 'Role created successfully',
            data: role,
        }
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: { name?: string; description?: string; permissionIds?: number[] },
        @CurrentUser() user: User,
    ) {
        const role = await this.roleService.update(
            {
                id,
                name: body.name,
                description: body.description,
                permissionIds: body.permissionIds || [],
            } as any,
            user,
        )
        return {
            message: 'Role updated successfully',
            data: role,
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ParseIntPipe) id: number) {
        await this.roleService.remove(id)
    }
}
