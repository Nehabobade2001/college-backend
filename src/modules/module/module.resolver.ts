import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { Permissions } from '@/common/decorators/PermissionDecorator'
import { ListInputDTO } from '@/common/paginationDto/withPagination'
import {
  ApplicationModule,
  ApplicationModuleArray,
  ApplicationModuleUnion,
  PaginatedApplicationModules,
} from '@/entities/Module'
import { UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateModuleDto, ModuleStatusDto, UpdateModuleDto } from './module.dto'
import { ApplicationModuleService } from './module.service'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { ErrorCodes } from '@/common/const/ErrorCodes'

@Resolver(() => ApplicationModule)
@UseGuards(JwtAuthGuard)
export class ApplicationModuleResolver {
  constructor(private readonly moduleService: ApplicationModuleService) {}

  // Create a new module
  @Mutation(() => ApplicationModule)
  @Permissions('MasterApp:Module:Create')
  async createModule(
    @Args('createModuleInput')
    createModuleInput: CreateModuleDto,
  ): Promise<ApplicationModule> {
    return this.moduleService.create(createModuleInput)
  }

  // List all modules with pagination
  @Query(() => PaginatedApplicationModules)
  @Permissions('MasterApp:Module:Read')
  async paginatedModules(
    @Args('ListInputDTO') listInputDTO: ListInputDTO,
  ): Promise<PaginatedApplicationModules> {
    // Call updated pagination function
    const paginationResult =
      await this.moduleService.listWithPagination(listInputDTO)

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

  // Get a module by id
  @Query(() => ApplicationModule)
  @Permissions('MasterApp:Module:Read')
  async findModuleById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<ApplicationModule> {
    return this.moduleService.findById(id)
  }

  // Update a module
  @Mutation(() => ApplicationModule)
  @Permissions('MasterApp:Module:Update')
  async updateModule(
    @Args('updateModuleInput')
    updateModuleInput: UpdateModuleDto,
  ): Promise<ApplicationModule> {
    return this.moduleService.update(updateModuleInput)
  }

  // Update module status
  @Mutation(() => ApplicationModuleUnion)
  @Permissions('MasterApp:Module:Action')
  async changeModuleStatus(
    @Args('updateModuleStatusInput')
    moduleStatusInput: ModuleStatusDto,
  ): Promise<ApplicationModule | ApplicationModuleArray> {
    const modules = await this.moduleService.enableModule(moduleStatusInput)

    if (!modules.length || modules.some((o) => !o || !o.id)) {
      throwGqlError(ErrorCodes.MODULE_NOT_FOUND)
    }

    return modules.length === 1 ? modules[0] : { data: modules }
  }

  // Delete a module
  @Mutation(() => Boolean)
  @Permissions('MasterApp:Module:Delete')
  async deleteModule(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<boolean> {
    return this.moduleService.delete(ids)
  }

  // Hard delete a module
  @Mutation(() => Boolean)
  @Permissions('MasterApp:Module:Delete')
  async hardDeleteModule(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<boolean> {
    return this.moduleService.hardDelete(ids)
  }

  // Restore a module
  @Mutation(() => Boolean)
  @Permissions('MasterApp:Module:Restore')
  async restoreModule(
    @Args('ids', { type: () => [Int] }) ids: number[],
  ): Promise<boolean> {
    await this.moduleService.restore(ids)
    return true
  }

  // Trash a module list with pagination
  @Query(() => PaginatedApplicationModules)
  @Permissions('MasterApp:Module:Read')
  async trashedModules(
    @Args('ListInputDTO') listInputDTO: ListInputDTO,
  ): Promise<PaginatedApplicationModules> {
    // Call updated pagination function
    const paginationResult =
      await this.moduleService.listTrashedWithPagination(listInputDTO)

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
