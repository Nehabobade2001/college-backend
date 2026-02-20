import { WithPagination } from '@/common/paginationDto/withPagination';
import { Package } from './Package';
export declare class ApplicationModule {
    id: number;
    name: string;
    description: string;
    status: string;
    packages: Package[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class PaginatedApplicationModules extends WithPagination {
    data: ApplicationModule[];
}
export type ApplicationModuleKey = keyof ApplicationModule;
export declare class ApplicationModuleArray {
    data: ApplicationModule[];
}
export declare const ApplicationModuleUnion: any;
