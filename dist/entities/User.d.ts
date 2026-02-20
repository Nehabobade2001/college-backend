import { WithPagination } from '@/common/paginationDto/withPagination';
import { Organization } from './Organization';
import { Role } from './Role';
import { UserRole } from './UserRole';
import { Project } from './Project';
import { Subscriptions } from './Subscription';
export declare enum UserType {
    admin = "admin",
    adminEmployee = "adminEmployee",
    organization = "organization",
    organizationEmployee = "organizationEmployee",
    thirdParty = "thirdParty",
    thirdPartyEmployee = "thirdPartyEmployee"
}
export declare enum Designation {
    SUPER_ADMIN = "SUPER_ADMIN",
    CEO = "CEO",
    CTO = "CTO",
    HR = "HR",
    MANAGER = "MANAGER",
    TEAM_LEAD = "TEAM_LEAD",
    EMPLOYEE = "EMPLOYEE"
}
export declare class User {
    id: number;
    name: string;
    username: string | null;
    mobileNo?: number;
    email: string;
    password: string;
    status: 'active' | 'inactive' | 'blocked' | 'pending';
    avatar?: string | null;
    parentId: number;
    organizationId: number;
    organization: Organization;
    project: Project;
    userRoles: UserRole[];
    isPrimary: boolean;
    userType: UserType;
    subscriptions: Subscriptions[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    roles: Role[];
    permissions: any[];
    designation: Designation;
    parent: User;
    subordinates: User[];
    createUsername(): Promise<void>;
    hashPassword(): Promise<void>;
    static validatePassword: (password: string, hash: string) => Promise<boolean>;
}
export declare class Otp {
    id: number;
    email: string;
    otp: number;
    otpType: 'login' | 'register' | 'reset-password' | 'verify-email' | 'forgot-password' | 'change-password';
    createdAt: Date;
    expiresAt: Date;
    setExpiresAt(): void;
}
export declare class LoginRes {
    user: User;
    accessToken: string;
}
export declare class RefreshRes extends LoginRes {
    refreshToken: string;
}
export declare class OtpRes {
    otpGeneratedSuccessfully: boolean;
    otp: number | null;
    message: string | null;
}
export declare class PaginatedUsers extends WithPagination {
    data: User[];
}
export type UserKey = keyof User;
export declare class UserArray {
    data: User[];
}
export declare const UserUnion: User | UserArray;
