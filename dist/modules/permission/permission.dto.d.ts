import { Permissions } from '@/entities/Permissions';
export declare enum appName {
    'MasterApp' = 0,
    'TaskManagement' = 1,
    'MaterialManagement' = 2,
    'VehicleManagement' = 3
}
export declare class CreatePermissionDto {
    appName: appName;
    action: string;
    module: string;
    description: string;
}
declare const UpdatePermissionDto_base: import("@nestjs/common").Type<Partial<CreatePermissionDto>>;
export declare class UpdatePermissionDto extends UpdatePermissionDto_base {
    id: number;
}
export declare class PermissionGroup {
    modules: Module[];
}
export declare class Module {
    name: string;
    groups: Group[];
}
export declare class Group {
    name: string;
    permissions: Permissions[];
}
export declare class PermissionDto {
    id: number;
    module: string;
    action: string;
    description: string;
    slug: string;
}
export declare class PermissionGroupDto {
    name: string;
    permissions: PermissionDto[];
}
export declare class AppPermissionsDto {
    appName: string;
    modules: PermissionGroupDto[];
}
export declare class DynamicPermissionsDto {
    apps: AppPermissionsDto[];
}
export {};
