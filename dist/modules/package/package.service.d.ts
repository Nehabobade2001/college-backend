import { Package } from '@/entities/Package';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreatePackageDto, PackageStatusDto, UpdatePackageDto } from './package.dto';
export declare class PackageService {
    private PackageRepository;
    constructor(PackageRepository: Repository<Package>);
    create(packageData: CreatePackageDto): Promise<Package>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Package>>;
    findById(id: number): Promise<Package>;
    update(packageData: UpdatePackageDto): Promise<Package>;
    delete(ids: number | number[]): Promise<boolean>;
    hardDelete(ids: number | number[]): Promise<boolean>;
    restore(ids: number | number[]): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<Package>>;
    enablePackage(data: PackageStatusDto): Promise<Package[]>;
    assignModuleInPkg(packageId: number, moduleIds: number[]): Promise<Package>;
    dropdownPackageList(query: PaginateQuery): Promise<Paginated<Package>>;
}
