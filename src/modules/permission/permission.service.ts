/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ErrorCodes } from '@/common/const/ErrorCodes'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { Permissions } from '@/entities/Permissions'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import slugify from 'slugify'
import { Repository } from 'typeorm'
import {
  DynamicPermissionsDto,
  PermissionGroupDto,
} from './permission.dto'
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate'

// Plain input interface — avoids GraphQL enum type confusion for REST calls
interface PermissionInput {
  appName?: string
  module?: string
  action?: string
  description?: string
  groupName?: string
  httpMethod?: string | null
  route?: string | null
}

@Injectable()
export class PermissionService {
  // Inject the Permission repository
  constructor(
    @InjectRepository(Permissions)
    private permissionRepository: Repository<Permissions>,
  ) { }

  // Create a new Permission
  async create(
    permissionData: PermissionInput,
  ): Promise<Permissions> {
    const queryRunner =
      this.permissionRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    // try-catch-finally block
    try {
      // create permission instance
      const permission = manager.create(Permissions, {
        ...permissionData,
        // Use the string value directly — the numeric enum lookup breaks for REST calls
        appName: String(permissionData.appName).replace(/\b\w/g, (char) =>
          char.toUpperCase(),
        ),
        groupName: 'Default',
        module: permissionData.module.replace(/\b\w/g, (char) =>
          char.toUpperCase(),
        ),
        action: permissionData.action.replace(/\b\w/g, (char) =>
          char.toUpperCase(),
        ),
        slug: slugify(
          `${String(permissionData.appName)}:${permissionData.module}:${permissionData.action}`.replace(
            /\b\w/g,
            (char) => char.toUpperCase(),
          ),
        ),
        // Explicitly carry through optional route fields
        httpMethod: permissionData.httpMethod ? permissionData.httpMethod.toUpperCase() : null,
        route: permissionData.route ?? null,
      })

      // save permission & return
      const savedPermission = await manager.save(permission)

      // commit transaction
      await queryRunner.commitTransaction()

      return savedPermission
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release queryRunner
      await queryRunner.release()
    }
  }

  // List all Permission
  async listWithPagination(
    query: PaginateQuery,
  ): Promise<Paginated<Permissions>> {
    // handle limit for safety purposes
    const limit = Math.min(query.limit ?? 50, 50)
    // Return the paginated result
    return paginate(query, this.permissionRepository, {
      defaultSortBy: [['createdAt', 'DESC']],
      defaultLimit: limit,
      maxLimit: 50,
      sortableColumns: ['id', 'slug', 'module', 'action', 'createdAt'],
      filterableColumns: {
        slug: [FilterOperator.EQ, FilterOperator.ILIKE],
        module: [FilterOperator.EQ, FilterOperator.ILIKE],
        action: [FilterOperator.EQ, FilterOperator.ILIKE],
      },
      searchableColumns: ['slug', 'module', 'action'],
    })
  }

  async findAll(): Promise<DynamicPermissionsDto> {
    const queryRunner =
      this.permissionRepository.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const manager = queryRunner.manager
      const permissions = await manager.find(Permissions, {
        // where: { action: 'Read' },
        // take: 20,
      })

      if (!permissions || permissions.length === 0) {
        throwGqlError(ErrorCodes.PERMISSIONS_NOT_FOUND)
      }

      const formattedPermissions: DynamicPermissionsDto = {
        apps: [],
      }

      const appMap: Record<
        string,
        { appName: string; modules: Record<string, PermissionGroupDto> }
      > = {}

      permissions.forEach((permission) => {
        const { appName, module, action, description, slug, id } = permission

        if (!appMap[appName]) {
          appMap[appName] = { appName, modules: {} }
        }

        if (!appMap[appName].modules[module]) {
          appMap[appName].modules[module] = {
            name: module,
            permissions: [],
          }
        }

        appMap[appName].modules[module].permissions.push({
          id,
          module,
          action,
          description,
          slug,
        })
      })
      console.log(
        'formattedPermissions',
        JSON.stringify(formattedPermissions, null, 2),
      )

      //   Convert object structure into an array format
      formattedPermissions.apps = Object.values(appMap).map((app) => ({
        appName: app.appName,
        modules: Object.values(app.modules), // Convert modules to an array
      }))

      await queryRunner.commitTransaction()
      return formattedPermissions
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Find a Permission by ID
  async findById(id: number): Promise<Permissions | undefined> {
    const queryRunner =
      this.permissionRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    // try-catch-finally block
    try {
      // get permission
      const permission = await manager.findOne(Permissions, {
        where: { id: id ?? null },
      })

      if (!permission) {
        throwGqlError(ErrorCodes.PERMISSIONS_NOT_FOUND)
      }

      // commit transaction
      await queryRunner.commitTransaction()

      return permission
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release queryRunner
      await queryRunner.release()
    }
  }

  // Update a Permission
  async update(
    id: number,
    permissionData: PermissionInput,
  ): Promise<Permissions> {
    const queryRunner =
      this.permissionRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    // try-catch-finally block
    try {
      const permission = await manager.findOne(Permissions, {
        where: { id: id ?? null },
      })

      if (!permission) {
        throwGqlError(ErrorCodes.PERMISSIONS_NOT_FOUND)
      }

      // update permission
      const appNameStr = String(permissionData.appName ?? permission.appName)
      const moduleStr = (permissionData.module ?? permission.module)
      const actionStr = (permissionData.action ?? permission.action)

      const newPermission = await manager.save(
        manager.merge(Permissions, permission, {
          ...permissionData,
          // Use the string value directly — the numeric enum lookup breaks for REST calls
          appName: appNameStr.replace(/\b\w/g, (char) => char.toUpperCase()),
          groupName: 'Default',
          module: moduleStr.replace(/\b\w/g, (char) => char.toUpperCase()),
          action: actionStr.replace(/\b\w/g, (char) => char.toUpperCase()),
          slug: slugify(
            `${appNameStr}:${moduleStr}:${actionStr}`.replace(
              /\b\w/g,
              (char) => char.toUpperCase(),
            ),
          ),
          // Explicitly carry through optional route fields
          httpMethod: permissionData.httpMethod !== undefined
            ? (permissionData.httpMethod ? permissionData.httpMethod.toUpperCase() : null)
            : permission.httpMethod,
          route: permissionData.route !== undefined ? permissionData.route : permission.route,
        }),
      )

      // commit transaction
      await queryRunner.commitTransaction()

      return newPermission
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release queryRunner
      await queryRunner.release()
    }
  }

  // Find a Permission by Slug
  async findPermissionBySlug(slug: string): Promise<Permissions> {
    const queryRunner =
      this.permissionRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    // try-catch-finally block
    try {
      // get permission
      const permission = await manager.findOne(Permissions, {
        where: { slug: slug ?? null },
      })

      if (!permission) {
        throwGqlError(ErrorCodes.PERMISSIONS_NOT_FOUND)
      }

      // commit transaction
      await queryRunner.commitTransaction()

      return permission
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release queryRunner
      await queryRunner.release()
    }
  }

  // Find a Permission by HTTP method + route path
  async findByRoute(
    httpMethod: string,
    route: string,
  ): Promise<Permissions | null> {
    return this.permissionRepository.findOne({
      where: {
        httpMethod: httpMethod.toUpperCase(),
        route,
      },
    })
  }

  // Delete a Permission
  async remove(id: number): Promise<void> {
    const queryRunner =
      this.permissionRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    // try-catch-finally block
    try {
      // delete permission
      await manager.softDelete(Permissions, id)

      // commit transaction
      await queryRunner.commitTransaction()
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release queryRunner
      await queryRunner.release()
    }
  }

  // group by permission
  async groupByPermission(): Promise<any> {
    const queryRunner =
      this.permissionRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    // try-catch-finally block
    try {
      const permissions = await manager.find(Permissions)

      if (!permissions) {
        throwGqlError(ErrorCodes.PERMISSIONS_NOT_FOUND)
      }

      const modules: any[] = []
      permissions.forEach((permission) => {
        const moduleIndex = modules.findIndex(
          (module) => module.name === permission.module,
        )
        if (moduleIndex === -1) {
          modules.push({
            name: permission.module,
            groups: [
              {
                name: permission.groupName,
                permissions: [permission],
              },
            ],
          })
        } else {
          const groupIndex = modules[moduleIndex].groups.findIndex(
            (group) => group.name === permission.groupName,
          )
          if (groupIndex === -1) {
            modules[moduleIndex].groups.push({
              name: permission.groupName,
              permissions: [permission],
            })
          } else {
            modules[moduleIndex].groups[groupIndex].permissions.push(permission)
          }
        }
      })

      // commit transaction
      await queryRunner.commitTransaction()

      return { modules }
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release queryRunner
      await queryRunner.release()
    }
  }
}
