import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Permissions } from '@/common/decorators/PermissionDecorator'
import { ListInputDTO } from '@/common/paginationDto/withPagination'
import {
  PackageStatusDto,
  CreatePackageDto,
  UpdatePackageDto,
} from './package.dto'
import {
  Package,
  PackageArray,
  PackageUnion,
  PaginatedPackages,
} from '@/entities/Package'
import { PackageService } from './package.service'
import { UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { ErrorCodes } from '@/common/const/ErrorCodes'

@Resolver(() => Package)
@UseGuards(JwtAuthGuard)
export class PackageResolver {
  constructor(private readonly PackageService: PackageService) {}

  // Create
  @Mutation(() => Package)
  @Permissions('MasterApp:Package:Create')
  async createPackage(
    @Args('createPackageInput')
    createPackageInput: CreatePackageDto,
  ): Promise<Package> {
    return this.PackageService.create(createPackageInput)
  }

  // List all with pagination
  @Query(() => PaginatedPackages)
  @Permissions('MasterApp:Package:Read')
  async paginatedPackages(
    @Args('ListInputDTO') listInputDTO: ListInputDTO,
  ): Promise<PaginatedPackages> {
    // Call updated pagination function
    const paginationResult =
      await this.PackageService.listWithPagination(listInputDTO)

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

  // Get by id
  @Query(() => Package)
  @Permissions('MasterApp:Package:Read')
  async findPackageById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Package> {
    return this.PackageService.findById(id)
  }

  // Update
  @Mutation(() => Package)
  @Permissions('MasterApp:Package:Update')
  async updatePackage(
    @Args('updatePackageInput')
    updatePackageInput: UpdatePackageDto,
  ): Promise<Package> {
    return this.PackageService.update(updatePackageInput)
  }

  // Update status
  @Mutation(() => PackageUnion)
  @Permissions('MasterApp:Package:Action')
  async changePackageStatus(
    @Args('updatePackageStatusInput')
    updatePackageStatusInput: PackageStatusDto,
  ): Promise<Package | PackageArray> {
    const pkgs = await this.PackageService.enablePackage(
      updatePackageStatusInput,
    )

    if (!pkgs.length || pkgs.some((o) => !o || !o.id)) {
      throwGqlError(ErrorCodes.PACKAGE_NOT_FOUND)
    }

    return pkgs.length === 1 ? pkgs[0] : { data: pkgs }
  }

  // Delete
  @Mutation(() => Boolean)
  @Permissions('MasterApp:Package:Delete')
  async deletePackage(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<boolean> {
    return this.PackageService.delete(ids)
  }

  // Hard delete
  @Mutation(() => Boolean)
  @Permissions('MasterApp:Package:Delete')
  async hardDeletePackage(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<boolean> {
    return this.PackageService.hardDelete(ids)
  }

  // Restore
  @Mutation(() => Boolean)
  @Permissions('MasterApp:Package:Restore')
  async restorePackage(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<boolean> {
    await this.PackageService.restore(ids)
    return true
  }

  // Trash list with pagination
  @Query(() => PaginatedPackages)
  @Permissions('MasterApp:Package:Read')
  async trashedPackages(
    @Args('ListInputDTO') listInputDTO: ListInputDTO,
  ): Promise<PaginatedPackages> {
    // Call updated pagination function
    const paginationResult =
      await this.PackageService.listTrashedWithPagination(listInputDTO)

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

  // Assign a module to a package
  @Mutation(() => Package)
  @Permissions('MasterApp:Package:Read', 'MasterApp:Module:Read')
  async assignModuleToPkg(
    @Args('packageId', { type: () => Int }) packageId: number,
    @Args('moduleIds', { type: () => [Int] }) moduleIds: number[],
  ): Promise<Package> {
    return this.PackageService.assignModuleInPkg(packageId, moduleIds)
  }

  // List all packages in dropdown
  @Query(() => PaginatedPackages)
  @Permissions('MasterApp:Package:Read')
  async packagesDropdown(
    @Args('ListInputDTO') listInputDTO: ListInputDTO,
  ): Promise<PaginatedPackages> {
    // Call updated pagination function
    const paginationResult =
      await this.PackageService.dropdownPackageList(listInputDTO)

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
}
