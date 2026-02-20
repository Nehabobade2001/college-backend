import { ApplicationModule } from '@/entities/Module'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Not, Repository } from 'typeorm'
import { CreateModuleDto, ModuleStatusDto, UpdateModuleDto } from './module.dto'
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { ErrorCodes } from '@/common/const/ErrorCodes'

@Injectable()
export class ApplicationModuleService {
  constructor(
    @InjectRepository(ApplicationModule)
    private moduleRepository: Repository<ApplicationModule>,
  ) {}

  async create(moduleData: CreateModuleDto): Promise<ApplicationModule> {
    const queryRunner =
      this.moduleRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    try {
      const module = manager.create(ApplicationModule, {
        ...moduleData,
        status: 'pending',
      })

      const savedModule = await manager.save(module)

      await queryRunner.commitTransaction()

      return savedModule
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // List all modules with pagination
  async listWithPagination(
    query: PaginateQuery,
  ): Promise<Paginated<ApplicationModule>> {
    // handle limit for safety purposes
    const limit = Math.min(query.limit ?? 50, 50)
    // Return the paginated result
    return paginate(query, this.moduleRepository, {
      defaultLimit: limit,
      defaultSortBy: [['createdAt', 'DESC']],
      maxLimit: 50,
      sortableColumns: ['id', 'name', 'status', 'createdAt'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE],
        status: [FilterOperator.EQ, FilterOperator.ILIKE],
      },
      searchableColumns: ['name', 'status'],
    })
  }

  // Find a module by id
  async findById(id: number): Promise<ApplicationModule> {
    const queryRunner =
      this.moduleRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager
    // try-catch-finally block
    try {
      // get project by ID
      const module = await manager.findOne(ApplicationModule, {
        where: { id: id ?? null },
      })

      if (!module) {
        throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
      }

      // commit transaction
      await queryRunner.commitTransaction()

      return module
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release queryRunner
      await queryRunner.release()
    }
  }

  // Update a module
  async update(moduleData: UpdateModuleDto): Promise<ApplicationModule> {
    const queryRunner =
      this.moduleRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    try {
      const module = await manager.findOne(ApplicationModule, {
        where: { id: moduleData.id ?? null },
      })

      if (!module) {
        throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
      }

      manager.merge(ApplicationModule, module, moduleData)

      const savedModule = await manager.save(module)

      await queryRunner.commitTransaction()

      return savedModule
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Soft delete a module
  async delete(ids: number | number[]): Promise<boolean> {
    const queryRunner =
      this.moduleRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    try {
      const idArray = Array.isArray(ids) ? ids : [ids]

      const module = await manager.find(ApplicationModule, {
        where: idArray.map((id: number) => ({ id })),
      })

      if (module.length !== idArray.length) {
        throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
      }
      // delete module
      await manager.softDelete(ApplicationModule, ids)

      // commit transaction
      await queryRunner.commitTransaction()

      return true
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Hard Delete a module
  async hardDelete(ids: number | number[]): Promise<boolean> {
    const queryRunner =
      this.moduleRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    try {
      const idArray = Array.isArray(ids) ? ids : [ids]

      const module = await manager.find(ApplicationModule, {
        where: idArray.map((id: number) => ({ id })),
        withDeleted: true,
      })

      if (module.length !== idArray.length) {
        throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
      }

      await manager.delete(ApplicationModule, ids)

      await queryRunner.commitTransaction()

      return true
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Restore a user
  async restore(ids: number | number[]): Promise<void> {
    const idArray = Array.isArray(ids) ? ids : [ids]

    const nodule = await this.moduleRepository.find({
      where: idArray.map((id: number) => ({ id })),
      withDeleted: true,
    })
    if (nodule.length !== idArray.length) {
      throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
    }
    await this.moduleRepository.restore(ids)
  }

  // Paginated list of all trashed users
  async listTrashedWithPagination(
    query: PaginateQuery,
  ): Promise<Paginated<ApplicationModule>> {
    // handle limit for safety purposes
    const limit = query.limit > 50 ? 50 : query.limit

    // Return the paginated result
    return paginate(query, this.moduleRepository, {
      defaultLimit: limit,
      defaultSortBy: [['createdAt', 'DESC']],
      maxLimit: 50,
      sortableColumns: ['id', 'name', 'status', 'createdAt'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE],
        status: [FilterOperator.EQ],
      },
      searchableColumns: ['name', 'status'],
      withDeleted: true,
      where: { deletedAt: Not(IsNull()) },
    })
  }

  // Change Project status
  async enableModule(data: ModuleStatusDto): Promise<ApplicationModule[]> {
    // new query runner
    const queryRunner =
      this.moduleRepository.manager.connection.createQueryRunner()

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
      const modules = await manager.find(ApplicationModule, {
        where: idArray.map((id: number) => ({ id })),
      })

      if (
        modules.length !== idArray.length ||
        modules.some((m) => !m || !m.id)
      ) {
        throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
      }

      // update status
      const updatedModule = await manager.save(
        modules.map((module) =>
          manager.merge(ApplicationModule, module, {
            status: data.status,
          }),
        ),
      )

      // Commit the transaction
      await queryRunner.commitTransaction()

      return updatedModule
    } catch (error) {
      // rollback transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release the query runner
      await queryRunner.release()
    }
  }
}
