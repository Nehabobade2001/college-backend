import { WithPagination } from '@/common/paginationDto/withPagination';
import { Project } from './Project';
import { User } from './User';
import { Role } from './Role';
export declare class Organization {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'blocked' | 'pending';
    users: User[];
    roles: Role[];
    projects: Project[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
export declare class PaginatedOrganizations extends WithPagination {
    data: Organization[];
}
export type OrganizationKey = keyof Organization;
export declare class OrganizationArray {
    data: Organization[];
}
export declare const OrganizationUnion: any;
