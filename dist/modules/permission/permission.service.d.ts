import { Permissions } from '@/entities/Permissions';
import { Repository } from 'typeorm';
import { CreatePermissionDto, DynamicPermissionsDto, UpdatePermissionDto } from './permission.dto';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
export declare class PermissionService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permissions>);
    create(permissionData: Partial<CreatePermissionDto>): Promise<Permissions>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Permissions>>;
    findAll(): Promise<DynamicPermissionsDto>;
    findById(id: number): Promise<Permissions | undefined>;
    update(id: number, permissionData: Partial<UpdatePermissionDto>): Promise<Permissions>;
    findPermissionBySlug(slug: string): Promise<Permissions>;
    remove(id: number): Promise<void>;
    groupByPermission(): Promise<any>;
}
