export declare class CreateCenterDto {
    name: string;
    address?: string;
    managerId?: number;
    phone?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    notes?: string;
}
export declare class UpdateCenterDto {
    id?: number;
    name?: string;
    address?: string;
    managerId?: number;
    phone?: string;
    email?: string;
    notes?: string;
    isActive?: boolean;
}
