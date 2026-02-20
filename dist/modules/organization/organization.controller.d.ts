import { OrganizationService } from './organization.service';
import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PaginatedOrganizations } from '@/entities/Organization';
export declare class OrganizationController {
    private readonly organizationService;
    constructor(organizationService: OrganizationService);
    allPaginatedOrganizations(listInputDTO: ListInputDTO): Promise<PaginatedOrganizations>;
    getOrganizationById(id: number): Promise<import("@/entities/Organization").Organization>;
}
