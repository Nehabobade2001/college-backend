import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { ApplicationModule, ApplicationModuleArray, PaginatedApplicationModules } from '@/entities/Module';
import { CreateModuleDto, ModuleStatusDto, UpdateModuleDto } from './module.dto';
import { ApplicationModuleService } from './module.service';
export declare class ApplicationModuleResolver {
    private readonly moduleService;
    constructor(moduleService: ApplicationModuleService);
    createModule(createModuleInput: CreateModuleDto): Promise<ApplicationModule>;
    paginatedModules(listInputDTO: ListInputDTO): Promise<PaginatedApplicationModules>;
    findModuleById(id: number): Promise<ApplicationModule>;
    updateModule(updateModuleInput: UpdateModuleDto): Promise<ApplicationModule>;
    changeModuleStatus(moduleStatusInput: ModuleStatusDto): Promise<ApplicationModule | ApplicationModuleArray>;
    deleteModule(ids: number[]): Promise<boolean>;
    hardDeleteModule(ids: number[]): Promise<boolean>;
    restoreModule(ids: number[]): Promise<boolean>;
    trashedModules(listInputDTO: ListInputDTO): Promise<PaginatedApplicationModules>;
}
