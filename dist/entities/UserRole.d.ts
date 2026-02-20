import { Role } from './Role';
import { User } from './User';
export declare class UserRole {
    id: number;
    roleId: number;
    userId: number;
    user: User;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
