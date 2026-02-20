import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { CurrentUser } from '@/common/decorators/CurrentUser'
import { Permissions } from '@/common/decorators/PermissionDecorator'
import { ListInputDTO } from '@/common/paginationDto/withPagination'
import { PaginatedUsers, User, UserArray, UserUnion } from '@/entities/User'
import { UseGuards } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Query,
  Resolver,
  ResolveReference,
} from '@nestjs/graphql'
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
  UserStatusDto,
} from './user.dto'
import { UsersService } from './users.service'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { ErrorCodes } from '@/common/const/ErrorCodes'

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string
    id: number
  }): Promise<User> {
    return await this.usersService.findByIdForRef(reference.id)
  }

  // List all users with pagination
  @Query(() => PaginatedUsers)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Read')
  async paginatedUsers(
    @Args('ListInputDTO') listInputDTO: ListInputDTO,
    @CurrentUser() authUser: User,
  ): Promise<PaginatedUsers> {
    // Call updated pagination function
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

  // Create a new user and assign a role
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Create')
  async createUser(
    @Args('data') data: CreateUserDto,
    @CurrentUser() authUser: User,
  ): Promise<User> {
    return await this.usersService.create(data, authUser)
  }

  // Find a user by ID
  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Read')
  async findUserById(@Args('id') id: number): Promise<User> {
    return await this.usersService.findById(id)
  }

  // Update a user
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Update')
  async updateUser(
    @Args('data') data: UpdateUserDto,
    @CurrentUser() authUser: User,
  ): Promise<User> {
    return await this.usersService.update(data, authUser)
  }

  // Delete a user
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Delete')
  async deleteUser(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() authUser: User,
  ): Promise<boolean> {
    await this.usersService.remove(ids, authUser)
    return true
  }

  // Assign a role to a user
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Update', 'MasterApp:Role:Update')
  async assignRoleToUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('roleIds', { type: () => [Int] }) roleIds: number[],
  ): Promise<User> {
    return this.usersService.assignRoleToUser(userId, roleIds)
  }

  // Change password
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Update')
  async changePassword(
    @Args('changePasswordData') changePasswordData: ChangePasswordDto,
  ): Promise<boolean> {
    return this.usersService.changePassword(changePasswordData)
  }

  // Update Profile
  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Update')
  async updateProfile(
    @Args('data') data: UpdateUserDto,
    @CurrentUser() authUser: User,
  ): Promise<User> {
    return await this.usersService.updateProfile(data, authUser)
  }

  // find permissions by user
  @Query(() => [String])
  @UseGuards(JwtAuthGuard)
  async findPermissionsByUser(@Args('id') id: number): Promise<string[]> {
    return await this.usersService.getPermissionsOfUser(id)
  }

  // Restore a user
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Restore')
  async restoreUser(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() authUser: User,
  ): Promise<boolean> {
    await this.usersService.restore(ids, authUser)
    return true
  }

  // Hard delete a user
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Delete')
  async hardDeleteUser(
    @Args('ids', { type: () => [Int] }) ids: number[],
    @CurrentUser() authUser: User,
  ): Promise<boolean> {
    await this.usersService.hardDelete(ids, authUser)
    return true
  }

  // Trash list of users with pagination
  @Query(() => PaginatedUsers)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Read')
  async trashedUsers(
    @Args('ListInputDTO') listInputDTO: ListInputDTO,
    @CurrentUser() authUser: User,
  ): Promise<PaginatedUsers> {
    // Call updated pagination function
    const paginationResult = await this.usersService.listTrashedWithPagination(
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

  // Change user status
  @Mutation(() => UserUnion)
  @UseGuards(JwtAuthGuard)
  @Permissions('MasterApp:User:Action')
  async changeUserStatus(
    @Args('data') data: UserStatusDto,
  ): Promise<User | UserArray> {
    const users = await this.usersService.enableUser(data)

    if (!users.length || users.some((u) => !u || !u.id)) {
      throwGqlError(ErrorCodes.USER_NOT_FOUND)
    }
    return users.length === 1 ? users[0] : { data: users }
  }

  // Get user hierarchy
  @UseGuards(JwtAuthGuard)
  @Query(() => [User])
  @Permissions('MasterApp:User:Read')
  async userHierarchy(
    @Args('parentId', { type: () => Int, nullable: true })
    parentId: number | null,
    @Args('nameFilter', { type: () => String, nullable: true })
    nameFilter?: string | null,
  ): Promise<User[]> {
    return this.usersService.getUserHierarchy(parentId, nameFilter)
  }
}
