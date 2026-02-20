import { ApplicationModule } from './Module';
import { WithPagination } from '@/common/paginationDto/withPagination';
export declare class Package {
    id: number;
    name: string;
    description: string;
    price: number;
    status: 'active' | 'inactive' | 'blocked' | 'pending';
    modules: ApplicationModule[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class PaginatedPackages extends WithPagination {
    data: Package[];
}
export type PackageKey = keyof Package;
export declare class PackageArray {
    data: Package[];
}
export declare const PackageUnion: any;
