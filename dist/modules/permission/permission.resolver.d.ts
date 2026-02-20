import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PaginatedPermissions, Permissions } from '@/entities/Permissions';
import { CreatePermissionDto, DynamicPermissionsDto, PermissionGroup, UpdatePermissionDto } from './permission.dto';
import { PermissionService } from './permission.service';
export declare class PermissionResolver {
    private readonly permission;
    permissionService: PermissionService;
    constructor(permission: PermissionService);
    allPermissions(): Promise<DynamicPermissionsDto>;
    paginatedPermissions(listInputDTO: ListInputDTO): Promise<PaginatedPermissions>;
    createPermission(data: CreatePermissionDto): Promise<Permissions>;
    findPermissionById(id: number): Promise<Permissions>;
    updatePermission(data: UpdatePermissionDto): Promise<Permissions>;
    deletePermission(id: number): Promise<boolean>;
    permissionGroup(): Promise<PermissionGroup>;
    resolveReference(reference: {
        __typename: string;
        id: number;
    }): Promise<Permissions>;
}
