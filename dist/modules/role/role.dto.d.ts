import { CustomStatus } from '@/common/const/CustomStatus';
export declare class CreateRoleDto {
    name: string;
    description?: string;
    permissionIds: number[];
}
declare const UpdateRoleDto_base: any;
export declare class UpdateRoleDto extends UpdateRoleDto_base {
    id: number;
}
export declare class RoleStatusDto {
    ids: number[];
    status: CustomStatus;
}
export {};
