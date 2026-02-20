import { ApplicationModule } from '@/entities/Module';
import { Repository } from 'typeorm';
import { CreateModuleDto, ModuleStatusDto, UpdateModuleDto } from './module.dto';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
export declare class ApplicationModuleService {
    private moduleRepository;
    constructor(moduleRepository: Repository<ApplicationModule>);
    create(moduleData: CreateModuleDto): Promise<ApplicationModule>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<ApplicationModule>>;
    findById(id: number): Promise<ApplicationModule>;
    update(moduleData: UpdateModuleDto): Promise<ApplicationModule>;
    delete(ids: number | number[]): Promise<boolean>;
    hardDelete(ids: number | number[]): Promise<boolean>;
    restore(ids: number | number[]): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<ApplicationModule>>;
    enableModule(data: ModuleStatusDto): Promise<ApplicationModule[]>;
}
