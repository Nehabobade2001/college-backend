import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { CustomStatus } from '@/common/const/CustomStatus';
import { Designation, UserType } from '@/entities/User';
export declare class CreateUserDto {
    name: string;
    email: string;
    mobileNo: number;
    roleIds: number[];
    avatar?: string;
    userType?: UserType;
    designation: Designation;
    parentId?: number | null;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    id: number;
}
declare const UserListInputDTO_base: import("@nestjs/common").Type<Partial<ListInputDTO>>;
export declare class UserListInputDTO extends UserListInputDTO_base {
    parentId?: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
    email: string;
}
export declare class UserStatusDto {
    ids: number;
    status: CustomStatus;
}
export {};
