export declare class Student {
    id: number;
    name: string;
    email: string | null;
    password?: string | null;
    isMe: boolean;
    organizationId?: number | null;
    status: string;
    isActive: boolean;
    qualification?: string | null;
    percentage?: number | null;
    documentUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
