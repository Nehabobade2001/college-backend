import { Role } from './Role';
export declare class RolePermissions {
    id: number;
    roleId: number;
    permissionId: number;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
