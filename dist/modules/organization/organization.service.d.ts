import { Organization } from '@/entities/Organization';
import { Repository } from 'typeorm';
import { CreateOrganizationDto, OrganizationStatusDto, UpdateOrganizationDto } from './organization.dto';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
export declare class OrganizationService {
    private organizationRepository;
    constructor(organizationRepository: Repository<Organization>);
    create(organizationData: CreateOrganizationDto): Promise<Organization>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Organization>>;
    findById(id: number): Promise<Organization>;
    update(organizationData: UpdateOrganizationDto): Promise<Organization>;
    delete(ids: number | number[]): Promise<boolean>;
    hardDelete(ids: number | number[]): Promise<boolean>;
    restore(ids: number | number[]): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<Organization>>;
    enableOrganization(data: OrganizationStatusDto): Promise<Organization[]>;
}
