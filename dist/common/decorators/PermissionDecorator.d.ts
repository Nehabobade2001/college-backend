import { PermissionKeys } from '../const/PermissionConst';
export declare const PERMISSIONS_KEY = "permissions";
export declare const Permissions: (...permissions: PermissionKeys[]) => import("@nestjs/common").CustomDecorator<string>;
