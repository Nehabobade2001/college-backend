import { Permissions } from './Permissions';
import { User } from './User';
import { WithPagination } from '@/common/paginationDto/withPagination';
import { RolePermissions } from './RolePermissions';
import { UserRole } from './UserRole';
import { Organization } from './Organization';
export declare class Role {
    id: number;
    name: string;
    organizationId: number;
    users: User[];
    permissions: Permissions[];
    description: string;
    roleType: string;
    isPrimary: boolean;
    status: 'active' | 'inactive' | 'blocked' | 'pending';
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    permissionCount: number;
    rolePermissions: RolePermissions;
    userRoles: UserRole[];
    organization: Organization;
}
export declare class PaginatedRoles extends WithPagination {
    data: Role[];
}
export type RoleKey = keyof Role;
export declare class RoleArray {
    data: Role[];
}
export declare const RoleUnion: Role | RoleArray;
