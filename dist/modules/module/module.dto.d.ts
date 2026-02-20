import { CustomStatus } from '@/common/const/CustomStatus';
export declare class CreateModuleDto {
    name: string;
    description?: string;
}
export declare class UpdateModuleDto extends CreateModuleDto {
    id: number;
}
export declare class ModuleStatusDto {
    ids: number;
    status: CustomStatus;
}
