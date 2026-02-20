import { ErrorCodes } from '@/common/const/ErrorCodes'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { ApplicationModule } from '@/entities/Module'
import { Package } from '@/entities/Package'
import { PackageModule } from '@/entities/PackageModule'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  FilterOperator,
  paginate,
  Paginated,
  PaginateQuery,
} from 'nestjs-paginate'
import { In, IsNull, Not, Repository } from 'typeorm'
import {
  CreatePackageDto,
  PackageStatusDto,
  UpdatePackageDto,
} from './package.dto'
import { formatDate } from '@/common/helpers/helper'

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private PackageRepository: Repository<Package>,
  ) {}

  async create(packageData: CreatePackageDto): Promise<Package> {
    const queryRunner =
      this.PackageRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    try {
      const existingModule = await manager.find(ApplicationModule, {
        where: { id: In(packageData.moduleIds) },
      })

      switch (true) {
        case !existingModule:
          throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
          break
        case packageData.discountedPrice > packageData.price:
          throwGqlError(ErrorCodes.DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE)
          break

        default:
          break
      }

      const pkg = manager.create(Package, {
        ...packageData,
        status: 'active',
        modules: existingModule,
      })

      const savedPackage = await manager.save(pkg)

      await queryRunner.commitTransaction()

      return await manager.findOne(Package, {
        where: { id: savedPackage.id },
        relations: ['modules'],
      })
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // List all with pagination
  async listWithPagination(query: PaginateQuery): Promise<Paginated<Package>> {
    // handle limit for safety purposes
    const limit = Math.min(query.limit ?? 50, 50)
    // Return the paginated result
    return paginate(query, this.PackageRepository, {
      relations: ['modules'],
      defaultSortBy: [['createdAt', 'DESC']],
      defaultLimit: limit,
      maxLimit: 50,
      sortableColumns: ['id', 'name', 'status', 'createdAt'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE],
        status: [FilterOperator.EQ, FilterOperator.ILIKE],
      },
      searchableColumns: ['name', 'status'],
    })
  }

  // Find  by id
  async findById(id: number): Promise<Package> {
    const queryRunner =
      this.PackageRepository.manager.connection.createQueryRunner()

    // connect to the database
    await queryRunner.connect()
    // start transaction
    await queryRunner.startTransaction()

    const manager = queryRunner.manager
    // try-catch-finally block
    try {
      // get project by ID
      const pkg = await manager.findOne(Package, {
        where: { id: id ?? IsNull() },
        relations: ['modules'],
      })

      if (!pkg) {
        throwGqlError(ErrorCodes.PACKAGE_NOT_FOUND)
      }

      // commit transaction
      await queryRunner.commitTransaction()

      return pkg
    } catch (error) {
      // Rollback transaction if any error occurs
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release queryRunner
      await queryRunner.release()
    }
  }

  // Update
  async update(packageData: UpdatePackageDto): Promise<Package> {
    const queryRunner =
      this.PackageRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    try {
      const pkg = await manager.findOne(Package, {
        where: { id: packageData.id ?? null },
      })

      if (!pkg) {
        throwGqlError(ErrorCodes.PACKAGE_NOT_FOUND)
      }

      const existingModule = await manager.find(ApplicationModule, {
        where: { id: In(packageData.moduleIds) },
      })

      if (packageData.offerExpiryDate < formatDate(new Date(), 'yyyy-MM-dd')) {
        throwGqlError(ErrorCodes.OFFER_EXPIRED)
      }

      switch (true) {
        case !existingModule:
          throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
          break
        case packageData.discountedPrice > packageData.price:
          throwGqlError(ErrorCodes.DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE)
          break
        default:
          break
      }

      manager.merge(Package, pkg, {
        ...packageData,
        modules: existingModule,
      })

      const savedPackage = await manager.save(pkg)

      await queryRunner.commitTransaction()

      const Pack = await manager.findOne(Package, {
        where: { id: savedPackage.id },
        relations: ['modules'],
      })

      return Pack
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Soft delete
  async delete(ids: number | number[]): Promise<boolean> {
    const queryRunner =
      this.PackageRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    try {
      const idArray = Array.isArray(ids) ? ids : [ids]

      const pkgs = await manager.find(Package, {
        where: idArray.map((id) => ({ id })),
      })

      if (pkgs.length !== idArray.length) {
        throwGqlError(ErrorCodes.PACKAGE_NOT_FOUND)
      }
      // delete
      await manager.softDelete(Package, ids)

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

  // Hard Delete
  async hardDelete(ids: number | number[]): Promise<boolean> {
    const queryRunner =
      this.PackageRepository.manager.connection.createQueryRunner()

    await queryRunner.connect()
    await queryRunner.startTransaction()

    const manager = queryRunner.manager

    try {
      const idArray = Array.isArray(ids) ? ids : [ids]

      const pkgs = await manager.find(Package, {
        where: idArray.map((id) => ({ id })),
        withDeleted: true,
      })

      if (pkgs.length !== idArray.length) {
        throwGqlError(ErrorCodes.PACKAGE_NOT_FOUND)
      }

      if (pkgs.some((plan) => plan.deletedAt === null)) {
        throwGqlError(ErrorCodes.PACKAGE_CAN_NOT_BE_HARD_DELETED)
      }

      await manager.delete(Package, ids)

      await queryRunner.commitTransaction()

      return true
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Restore
  async restore(ids: number | number[]): Promise<void> {
    const idArray = Array.isArray(ids) ? ids : [ids]

    const pkgs = await this.PackageRepository.find({
      where: idArray.map((id) => ({ id })),
      withDeleted: true,
    })
    if (pkgs.length !== idArray.length) {
      throwGqlError(ErrorCodes.PACKAGE_NOT_FOUND)
    }
    await this.PackageRepository.restore(ids)
  }

  // Paginated list of all trashed
  async listTrashedWithPagination(
    query: PaginateQuery,
  ): Promise<Paginated<Package>> {
    // handle limit for safety purposes
    const limit = query.limit > 50 ? 50 : query.limit

    // Return the paginated result
    return paginate(query, this.PackageRepository, {
      relations: ['modules'],
      defaultLimit: limit,
      maxLimit: 50,
      defaultSortBy: [['createdAt', 'DESC']],
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

  // Change status
  async enablePackage(data: PackageStatusDto): Promise<Package[]> {
    // new query runner
    const queryRunner =
      this.PackageRepository.manager.connection.createQueryRunner()

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
      const pkgs = await manager.find(Package, {
        where: idArray.map((id) => ({ id })),
      })

      if (pkgs.length !== idArray.length || pkgs.some((pkg) => pkg.deletedAt)) {
        throwGqlError(ErrorCodes.PACKAGE_NOT_FOUND)
      }

      // update status
      const updatedPackage = await manager.save(
        pkgs.map((pkg) =>
          manager.merge(Package, pkg, {
            status: data.status,
          }),
        ),
      )

      // Commit the transaction
      await queryRunner.commitTransaction()

      return updatedPackage
    } catch (error) {
      // rollback transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // release the query runner
      await queryRunner.release()
    }
  }

  // Assign modules to package in pivot table package_modules
  async assignModuleInPkg(
    packageId: number,
    moduleIds: number[],
  ): Promise<Package> {
    const queryRunner =
      this.PackageRepository.manager.connection.createQueryRunner()

    // Connect to the database
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      const manager = queryRunner.manager

      // Check if package exists
      const pkg = await manager.findOne(Package, { where: { id: packageId } })
      if (!pkg) {
        throwGqlError(ErrorCodes.PACKAGE_NOT_FOUND)
      }

      // Fetch valid modules
      const applicationModules = await manager.findBy(ApplicationModule, {
        id: In(moduleIds),
      })

      console.log(applicationModules, 'applicationModules')

      if (applicationModules.length !== moduleIds.length) {
        throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
      }

      // Get already assigned modules
      const existingModules = await manager.findBy(PackageModule, {
        packageId,
        moduleId: In(moduleIds),
      })

      const existingModuleIds = existingModules.map((pm) => pm.moduleId)
      const newModuleIds = moduleIds.filter(
        (id) => !existingModuleIds.includes(id),
      )

      if (newModuleIds.length > 0) {
        const packageModules = newModuleIds.map((moduleId) =>
          manager.create(PackageModule, { packageId, moduleId }),
        )

        // Insert new records into the pivot table
        await manager.save(packageModules)
      }

      // Fetch updated package with modules
      const updatedPkg = await manager.findOne(Package, {
        where: { id: packageId },
        relations: ['modules'],
      })

      console.log(updatedPkg, 'updatedPkg')

      // Commit the transaction
      await queryRunner.commitTransaction()

      return updatedPkg
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Paginated list of all trashed
  async dropdownPackageList(query: PaginateQuery): Promise<Paginated<Package>> {
    // handle limit for safety purposes
    const limit = query.limit > 50 ? 50 : query.limit

    // Return the paginated result
    return paginate(query, this.PackageRepository, {
      relations: ['modules'],
      defaultLimit: limit,
      maxLimit: 50,
      defaultSortBy: [['createdAt', 'DESC']],
      sortableColumns: ['id', 'name', 'status', 'createdAt'],
      filterableColumns: {
        name: [FilterOperator.EQ, FilterOperator.ILIKE],
        status: [FilterOperator.EQ],
      },
      searchableColumns: ['name', 'status'],
    })
  }
}
