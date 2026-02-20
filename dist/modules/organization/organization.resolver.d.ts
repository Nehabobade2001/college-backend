import { Organization, OrganizationArray, PaginatedOrganizations } from '@/entities/Organization';
import { CreateOrganizationDto, OrganizationStatusDto, UpdateOrganizationDto } from './organization.dto';
import { OrganizationService } from './organization.service';
import { ListInputDTO } from '@/common/paginationDto/withPagination';
export declare class OrganizationResolver {
    private organizationService;
    constructor(organizationService: OrganizationService);
    createOrganization(createOrganizationInput: CreateOrganizationDto): Promise<Organization>;
    paginatedOrganization(listInputDTO: ListInputDTO): Promise<PaginatedOrganizations>;
    findOrganizationById(id: number): Promise<Organization>;
    updateOrganization(updateOrganizationInput: UpdateOrganizationDto): Promise<Organization>;
    deleteOrganization(ids: number[]): Promise<boolean>;
    enableOrganizationStatus(data: OrganizationStatusDto): Promise<Organization | OrganizationArray>;
    hardDeleteOrganization(ids: number[]): Promise<boolean>;
    restoreOrganization(ids: number[]): Promise<boolean>;
    listTrashedOrganizations(listInputDTO: ListInputDTO): Promise<PaginatedOrganizations>;
    resolveReference(reference: {
        __typename: string;
        id: number;
    }): Promise<Organization>;
}
