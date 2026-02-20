import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PaginatedRoles, Role, RoleArray } from '@/entities/Role';
import { User } from '@/entities/User';
import { CreateRoleDto, RoleStatusDto, UpdateRoleDto } from './role.dto';
import { RoleService } from './role.service';
export declare class RoleResolver {
    private readonly role;
    roleService: RoleService;
    constructor(role: RoleService);
    paginatedRoles(listInputDTO: ListInputDTO): Promise<PaginatedRoles>;
    createRole(data: CreateRoleDto, user: User): Promise<Role>;
    findRoleById(id: number): Promise<Role>;
    updateRole(data: UpdateRoleDto, user: User): Promise<Role>;
    deleteRole(ids: number[]): Promise<boolean>;
    hardDeleteRole(ids: number[]): Promise<boolean>;
    assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<Role>;
    restoreRole(ids: number[], authUser: User): Promise<boolean>;
    changeRoleStatus(data: RoleStatusDto): Promise<Role | RoleArray>;
    listTrashedRoles(listInputDTO: ListInputDTO): Promise<PaginatedRoles>;
    resolveReference(reference: {
        __typename: string;
        id: number;
    }): Promise<Role>;
}
