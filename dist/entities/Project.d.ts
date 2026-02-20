import { User } from './User';
import { Organization } from './Organization';
export declare class Project {
    id: number;
    name: string;
    description: string;
    status: 'active' | 'inactive' | 'blocked' | 'pending';
    organizationId: number;
    createdById: number;
    organization: Organization;
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
