import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PackageStatusDto, CreatePackageDto, UpdatePackageDto } from './package.dto';
import { Package, PackageArray, PaginatedPackages } from '@/entities/Package';
import { PackageService } from './package.service';
export declare class PackageResolver {
    private readonly PackageService;
    constructor(PackageService: PackageService);
    createPackage(createPackageInput: CreatePackageDto): Promise<Package>;
    paginatedPackages(listInputDTO: ListInputDTO): Promise<PaginatedPackages>;
    findPackageById(id: number): Promise<Package>;
    updatePackage(updatePackageInput: UpdatePackageDto): Promise<Package>;
    changePackageStatus(updatePackageStatusInput: PackageStatusDto): Promise<Package | PackageArray>;
    deletePackage(ids: number[]): Promise<boolean>;
    hardDeletePackage(ids: number[]): Promise<boolean>;
    restorePackage(ids: number[]): Promise<boolean>;
    trashedPackages(listInputDTO: ListInputDTO): Promise<PaginatedPackages>;
    assignModuleToPkg(packageId: number, moduleIds: number[]): Promise<Package>;
    packagesDropdown(listInputDTO: ListInputDTO): Promise<PaginatedPackages>;
}
