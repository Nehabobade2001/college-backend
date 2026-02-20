import { Role } from '@/entities/Role';
import { User } from '@/entities/User';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateRoleDto, RoleStatusDto, UpdateRoleDto } from './role.dto';
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    create(roleData: CreateRoleDto, authUser: User): Promise<Role>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Role>>;
    findById(id: number): Promise<Role | undefined>;
    update(roleData: UpdateRoleDto, _authUser: User): Promise<Role>;
    remove(ids: number | number[]): Promise<void>;
    hardDelete(ids: number | number[]): Promise<void>;
    restore(ids: number | number[], _authUser: User): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<Role>>;
    enableRole(data: RoleStatusDto): Promise<Role[]>;
    assignAllPermissionsToRole(roleId: number, permissionIds: number[]): Promise<Role>;
}
