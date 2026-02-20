import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'

import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { CurrentUser } from '@/common/decorators/CurrentUser'
import { Permissions } from '@/common/decorators/PermissionDecorator'
import { ListInputDTO } from '@/common/paginationDto/withPagination'
import { PaginatedUsers, User } from '@/entities/User'
import { ApiTokenService } from '../auth/apiToken.service'
import { CreateUserDto } from './user.dto'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly apiTokenService: ApiTokenService,
  ) {}

  @Permissions('MasterApp:User:Read')
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id)
  }

  @Permissions('MasterApp:User:Read')
  @Post('all')
  async getAllUsers(
    @Body() listInputDTO: ListInputDTO,
    @CurrentUser() authUser: User,
  ): Promise<PaginatedUsers> {
    if (!authUser || !authUser.id) {
      throw new UnauthorizedException('Invalid or missing user in context')
    }

    const paginationResult = await this.usersService.listWithPagination(
      listInputDTO,
      authUser,
    )

    return {
      data: paginationResult.data,
      meta: {
        totalItems: paginationResult.meta.totalItems,
        totalPages: paginationResult.meta.totalPages,
        currentPage: paginationResult.meta.currentPage,
        limit: paginationResult.meta.itemsPerPage,
      },
    }
  }

  @Permissions('MasterApp:User:Read')
  @Post('user-hierarchy')
  async userHierarchy(
    @Body('parentId') parentId: number | null,
    @Body('nameFilter') nameFilter?: string | null,
  ): Promise<User[]> {
    return this.usersService.getUserHierarchy(parentId, nameFilter)
  }

  @Permissions('MasterApp:User:Create')
  @Post('create')
  async createUser(
    @Body() user: CreateUserDto,
    _authUser: User,
  ): Promise<User> {
    return this.usersService.create(user, _authUser)
  }

  @Post('validate')
  async validateToken(
    @Body('tokenId') tokenId: string,
    @Body('permissions') permissions: string[],
  ): Promise<{
    error: boolean
    message?: string
    code?: string
    user: User | null
  }> {
    try {
      const isValid = await this.apiTokenService.verifyTokenAndPermissions(
        tokenId,
        permissions,
      )

      return isValid
    } catch (error) {
      console.error('error', error)
      return {
        error: true,
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
        user: null,
      }
    }
  }
}
