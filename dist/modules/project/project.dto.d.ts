export declare enum CustomStatus {
    active = "active",
    inactive = "inactive",
    blocked = "blocked",
    pending = "pending"
}
export declare class CreateProjectDto {
    name: string;
    description: string;
    organizationId: number;
}
declare const UpdateProjectDto_base: import("@nestjs/common").Type<Partial<CreateProjectDto>>;
export declare class UpdateProjectDto extends UpdateProjectDto_base {
    id: number;
}
export declare class ProjectStatusDto {
    ids: number[];
    status: CustomStatus;
}
export {};
