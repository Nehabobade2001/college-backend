import { Role } from './Role';
import { WithPagination } from '@/common/paginationDto/withPagination';
export declare class Permissions {
    id: number;
    appName: string;
    groupName: string;
    module: string;
    action: string;
    slug: string;
    description: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export declare class PaginatedPermissions extends WithPagination {
    data: Permissions[];
}
export type PermissionsKey = keyof Permissions;
