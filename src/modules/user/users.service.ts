/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ErrorCodes } from '@/common/const/ErrorCodes'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { isTempFile, moveFile } from '@/common/helpers/helper'
import { Role } from '@/entities/Role'
import { User, UserType } from '@/entities/User'
import { UserRole } from '@/entities/UserRole'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as argon2 from 'argon2'
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate'
import { In, IsNull, Not, Repository } from 'typeorm'
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateUserDto,
  UserStatusDto,
} from './user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new User
  async create(userData: CreateUserDto, _authUser: User): Promise<User> {
    // Create a new queryRunner
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // Connect to the database
    await queryRunner.connect()

    // Start transaction
    await queryRunner.startTransaction()

    // Manager
    const manager = queryRunner.manager

    try {
      // Hash the password
      const hashedPassword = 'Password@123'

      // Find roles
      const roles = await manager.find(Role, {
        where: {
          id: In(userData.roleIds),
          organizationId: _authUser.organizationId,
        },
      })

      if (!roles.length) {
        throwGqlError(ErrorCodes.NO_ROLES_FOUND)
      }

      const authUser = _authUser
      console.log('authUser', authUser)

      let userType: UserType = authUser.userType

      // Default userType from input
      if (
        authUser.userType === UserType.admin ||
        authUser.userType === UserType.adminEmployee
      ) {
        if (
          userData.userType === UserType.admin ||
          userData.userType === UserType.adminEmployee
        ) {
          userType = userData.userType
        } else {
          throwGqlError(ErrorCodes.INVALID_USER_TYPE)
        }
      } else if (
        authUser.userType === UserType.organization ||
        authUser.userType === UserType.organizationEmployee
      ) {
        // Organization can create either organization or organization employee
        if (
          userData.userType === UserType.organization ||
          userData.userType === UserType.organizationEmployee
        ) {
          userType = userData.userType
        } else {
          throwGqlError(ErrorCodes.INVALID_USER_TYPE)
        }
      } else {
        throwGqlError(ErrorCodes.INVALID_USER_TYPE)
      }

      // Create new user
      const newUser = manager.create(User, {
        ...userData,
        userType,
        status: 'active',
        password: hashedPassword,
        organizationId: authUser.organizationId,
        roles,
        parent: await manager.findOne(User, {
          where: { id: userData.parentId },
        }),
        designation: userData.designation,
      })

      // Save the new user to the database
      const saved = await manager.save(newUser)

      // Commit the transaction
      await queryRunner.commitTransaction()

      // Return the newly created user
      return await this.userRepository.findOneOrFail({
        where: { id: saved.id },
      })
    } catch (error) {
      // Rollback the transaction on error
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Release the queryRunner
      await queryRunner.release()
    }
  }

  // List all users with pagination
  async listWithPagination(
    query: PaginateQuery,
    authUser: User,
  ): Promise<Paginated<User>> {
    // Limit to prevent excessive data fetching
    const limit = Math.min(query.limit ?? 50, 50)

    const orgId = authUser?.organizationId

    if (!orgId) {
      throwGqlError(ErrorCodes.ORGANIZATION_NOT_FOUND)
    }

    // Use the paginate function correctly
    const user = await paginate(query, this.userRepository, {
      defaultLimit: limit,
      defaultSortBy: [['createdAt', 'DESC']],
      maxLimit: 50,
      relations: ['roles', 'organization'],
      where: {
        organizationId: orgId,
        ...(query.filter?.parentId && {
          parentId: Number(query.filter.parentId),
        }),
      },
      sortableColumns: [
        'id',
        'name',
        'username',
        'email',
        'mobileNo',
        'status',
        'designation',
        'createdAt',
      ],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE],
        username: [FilterOperator.EQ, FilterOperator.ILIKE],
        email: [FilterOperator.EQ, FilterOperator.ILIKE],
        status: [FilterOperator.EQ, FilterOperator.IN],
        mobileNo: [FilterOperator.EQ, FilterOperator.ILIKE],
        createdAt: [FilterOperator.EQ, FilterOperator.GT, FilterOperator.LT],
        parentId: [FilterOperator.EQ],
      },
      searchableColumns: [
        'name',
        'username',
        'email',
        'mobileNo',
        'designation',
        'status',
      ],
    })
    return user
  }

  // Find a User by ID
  async findById(id: number): Promise<User | undefined> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    // try-catch-finally block
    try {
      const manager = queryRunner.manager

      const user = await manager.findOne(User, {
        where: { id: id ?? null },
        relations: [
          'roles',
          'roles.permissions',
          'organization',
          'project',
          'subordinates',
          'subordinates.subordinates',
        ],
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND, { email: user?.email })
      }

      // commit the transaction
      await queryRunner.commitTransaction()

      return user
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async findByIdForRef(id: number): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { id: id ?? null },
      withDeleted: true,
      relations: [
        'roles',
        'roles.permissions',
        'organization',
        'project',
        'subordinates',
        'subordinates.subordinates',
      ],
    })

    if (!user) {
      throwGqlError(ErrorCodes.USER_NOT_FOUND, { email: user?.email })
    }

    return user
  }

  // Update a user
  async update(userData: UpdateUserDto, _authUser?: User): Promise<User> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    // try-catch-finally block
    try {
      const manager = queryRunner.manager

      const user = await manager.findOne(User, {
        where: { id: userData.id ?? null },
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND)
      }

      // User cannot update his own email
      if (user.email !== userData.email) {
        const existingUser = await manager.findOne(User, {
          where: { email: userData.email },
        })

        if (existingUser) {
          throwGqlError(ErrorCodes.USER_CANNOT_CHANGE_EMAIL, {
            email: userData.email,
          })
        }
      }

      // find role from users- role table
      const roles = await manager.find(Role, {
        where: {
          id: In(userData.roleIds),
          organizationId: _authUser.organizationId,
        },
      })

      if (!roles.length) {
        throwGqlError(ErrorCodes.NO_ROLES_FOUND)
      }

      const authUser = _authUser
      console.log('authUser', authUser)

      let userType: UserType = authUser.userType

      // Default userType from input
      if (
        authUser.userType === UserType.admin ||
        authUser.userType === UserType.adminEmployee
      ) {
        if (
          userData.userType === UserType.admin ||
          userData.userType === UserType.adminEmployee
        ) {
          userType = userData.userType
        } else {
          throwGqlError(ErrorCodes.INVALID_USER_TYPE)
        }
      } else if (
        authUser.userType === UserType.organization ||
        authUser.userType === UserType.organizationEmployee
      ) {
        // Organization can create either organization or organization employee
        if (
          userData.userType === UserType.organization ||
          userData.userType === UserType.organizationEmployee
        ) {
          userType = userData.userType
        } else {
          throwGqlError(ErrorCodes.INVALID_USER_TYPE)
        }
      } else {
        throwGqlError(ErrorCodes.INVALID_USER_TYPE)
      }

      await manager.save(
        manager.merge(User, user, {
          ...userData,
          userType,
          organizationId: _authUser.organizationId,
          roles,
          parent: await manager.findOne(User, {
            where: { id: userData.parentId },
          }),
          designation: userData.designation,
        }),
      )

      await queryRunner.commitTransaction()

      return manager.findOne(User, { where: { id: userData.id } })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Soft Delete a user
  async remove(ids: number | number[], authUser: User): Promise<void> {
    const idArray = Array.isArray(ids) ? ids : [ids]

    const users = await this.userRepository.find({
      where: idArray.map((id) => ({ id, organizationId: authUser.id })),
      withDeleted: true,
    })

    if (users.length !== idArray.length) {
      throwGqlError(ErrorCodes.USER_NOT_FOUND, {
        email: users.map((user) => user.email).join(', '),
      })
    }

    if (users.some((user) => user.isPrimary)) {
      throwGqlError(ErrorCodes.CANNOT_DELETE_SUPER_ADMIN)
    }

    if (ids === authUser.id) {
      throwGqlError(ErrorCodes.CANNOT_DELETE_LOGGED_IN_USER)
    }
    await this.userRepository.softDelete(ids)
  }

  // Hard Delete a user
  async hardDelete(ids: number | number[], authUser: User): Promise<void> {
    const idArray = Array.isArray(ids) ? ids : [ids]

    const users = await this.userRepository.find({
      where: idArray.map((id) => ({ id, organizationId: authUser.id })),
      withDeleted: true,
    })

    if (users.length !== idArray.length) {
      throwGqlError(ErrorCodes.USER_NOT_FOUND, {
        email: users.map((user) => user.email).join(', '),
      })
    }

    if (users.some((user) => user.isPrimary)) {
      throwGqlError(ErrorCodes.CANNOT_DELETE_SUPER_ADMIN)
    }

    if (ids === authUser.id) {
      throwGqlError(ErrorCodes.CANNOT_DELETE_LOGGED_IN_USER)
    }

    await this.userRepository.delete(ids)
  }

  // Restore a user
  async restore(ids: number | number[], authUser: User): Promise<void> {
    const idArray = Array.isArray(ids) ? ids : [ids]

    const users = await this.userRepository.find({
      where: idArray.map((id) => ({ id, organizationId: authUser.id })),
      withDeleted: true,
    })
    if (users.length !== idArray.length) {
      throwGqlError(ErrorCodes.USER_NOT_FOUND)
    }
    await this.userRepository.restore(ids)
  }

  // Paginated list of all trashed users
  async listTrashedWithPagination(
    query: PaginateQuery,
    authUser: User,
  ): Promise<Paginated<User>> {
    // Limit to prevent excessive data fetching
    const limit = Math.min(query.limit ?? 50, 50)

    // Use the paginate function correctly
    return paginate(query, this.userRepository, {
      defaultLimit: limit,
      defaultSortBy: [['createdAt', 'DESC']],
      maxLimit: 50,
      relations: ['roles', 'organization'],
      sortableColumns: [
        'id',
        'name',
        'username',
        'email',
        'mobileNo',
        'status',
        'createdAt',
      ],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE],
        username: [FilterOperator.EQ, FilterOperator.ILIKE],
        email: [FilterOperator.EQ, FilterOperator.ILIKE],
        status: [FilterOperator.EQ, FilterOperator.IN],
        mobileNo: [FilterOperator.EQ, FilterOperator.ILIKE],
        createdAt: [FilterOperator.EQ, FilterOperator.GT, FilterOperator.LT],
      },
      searchableColumns: ['name', 'username', 'email', 'mobileNo', 'status'],
      withDeleted: true,
      where: {
        deletedAt: Not(IsNull()),
        organizationId: authUser.organizationId,
      },
    })
  }

  // Change User status
  async enableUser(data: UserStatusDto): Promise<User[]> {
    // new query runner
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // Connect to the database using the query runner
    await queryRunner.connect()

    // start transaction
    await queryRunner.startTransaction()

    // manager
    const manager = queryRunner.manager
    // try catch
    try {
      const idArray = Array.isArray(data.ids) ? data.ids : [data.ids]
      // check if exists
      const users = await manager.find(User, {
        where: idArray.map((id: number) => ({ id })),
      })
      console.log(
        'users',
        users.some((user) => user.isPrimary),
      )
      if (users.some((user) => user.isPrimary)) {
        throwGqlError(ErrorCodes.CANNOT_CHANGE_SUPER_ADMIN)
      }

      if (users.length !== idArray.length || users.some((p) => !p || !p.id)) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND, {
          email: users.map((user) => user.email).join(', '),
        })
      }

      // update status
      const updatedUser = await manager.save(
        users.map((user) =>
          manager.merge(User, user, {
            status: data.status,
          }),
        ),
      )

      // Commit the transaction
      await queryRunner.commitTransaction()

      return updatedUser
    } catch (error) {
      // rollback transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release the query runner
      await queryRunner.release()
    }
  }

  // Assign a role to a user
  async assignRoleToUser(userId: number, roleIds: number[]): Promise<User> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    // try-catch-finally block
    try {
      const manager = queryRunner.manager

      // Find the user by ID
      const user = await manager.findOne(User, {
        where: { id: userId ?? null },
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND)
      }

      // Find the role by ID
      const role = await manager.find(Role, {
        where: {
          id: In(roleIds),
        },
      })

      if (!role) {
        throwGqlError(ErrorCodes.INVALID_ROLE)
      }

      await manager.save(manager.create(UserRole, { userId, roleIds }))

      // commit the transaction
      await queryRunner.commitTransaction()

      // return the updated user
      return user
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Change password method
  async changePassword(changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    // try-catch-finally block
    try {
      const { currentPassword, newPassword, email } = changePasswordDto

      // Find user by email
      const user = await manager.findOne(User, {
        where: { email: email ?? null },
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND)
      }

      // Validate current password
      const isCurrentPasswordValid = await argon2.verify(
        currentPassword,
        user.password,
      )

      if (!isCurrentPasswordValid) {
        throwGqlError(ErrorCodes.INVALID_PASSWORD_INPUT, {
          password: currentPassword,
        })
      }

      // Hash new password
      const hashedNewPassword = await argon2.hash(newPassword)

      // Update user password
      user.password = hashedNewPassword
      await this.userRepository.save(user)

      // commit the transaction
      await queryRunner.commitTransaction()

      return true
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Update user Profile
  async updateProfile(
    userData: Partial<UpdateUserDto>,
    _authUser: User,
  ): Promise<User> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    // try-catch-finally block
    try {
      const manager = queryRunner.manager

      const user = await manager.findOne(User, {
        where: { id: userData.id ?? null },
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND)
      }

      // User cannot update his own email
      if (user.email !== userData.email) {
        const existingUser = await manager.findOne(User, {
          where: { email: userData.email },
        })

        if (existingUser) {
          throwGqlError(ErrorCodes.USER_CANNOT_CHANGE_EMAIL, {
            email: userData.email,
          })
        }
      }

      if (isTempFile(userData.avatar)) {
        userData.avatar = await moveFile(userData.avatar)
      }

      if (userData.avatar === '') {
        delete userData.avatar
      }

      await manager.save(
        manager.merge(User, user, {
          ...userData,
          organizationId: _authUser.organizationId,
        }),
      )

      await queryRunner.commitTransaction()

      return manager.findOne(User, { where: { id: userData.id ?? null } })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // get permissions of a user
  async getPermissionsOfUser(userId: number): Promise<any> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    // try-catch-finally block
    try {
      const manager = queryRunner.manager

      const user = await manager.findOne(User, {
        where: { id: userId ?? null },
        relations: ['roles', 'roles.permissions'],
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND)
      }

      // commit the transaction
      await queryRunner.commitTransaction()

      const allPermissions = user.roles.reduce((acc, role) => {
        return [...acc, ...role.permissions.map((p) => p.slug)]
      }, [])

      // Filter duplicates
      const uniquePermissions = Array.from(new Set(allPermissions))

      return uniquePermissions.sort()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  async getUserHierarchy(
    parentId: number | null,
    nameFilter?: string | null,
  ): Promise<User[]> {
    // Step 1: Fetch all children of this parent (no filter on name here!)
    const children = await this.userRepository.find({
      where: { parentId },
      relations: ['roles', 'organization', 'parent'],
    })

    const result: User[] = []

    for (const child of children) {
      // Step 2: Always get subordinates recursively
      const descendants = await this.getUserHierarchy(child.id, nameFilter)

      // Step 3: Check if this child or any of its subordinates match the filter
      const isSelfMatch =
        !nameFilter ||
        child.name.toLowerCase().includes(nameFilter.toLowerCase())
      const hasMatchingDescendants = descendants.length > 0

      if (isSelfMatch || hasMatchingDescendants) {
        child.subordinates = descendants
        result.push(child)
      }
    }

    return result
  }
}
