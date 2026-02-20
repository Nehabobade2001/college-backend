import { CustomStatus } from '../project/project.dto';
export declare class CreateOrganizationDto {
    name: string;
    description: string;
}
export declare class UpdateOrganizationDto extends CreateOrganizationDto {
    id: number;
}
export declare class OrganizationStatusDto {
    ids: number[];
    status: CustomStatus;
}
