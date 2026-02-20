export declare class CreateStudentDto {
    name: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    qualification?: string;
    percentage?: number;
    documentUrl?: string;
    isMe?: boolean;
    organizationId?: number;
    status?: string;
}
export declare class UpdateStudentDto {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    qualification?: string;
    percentage?: number;
    documentUrl?: string;
    isMe?: boolean;
    status?: string;
}
