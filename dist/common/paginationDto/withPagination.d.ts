declare class Meta {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}
export declare class WithPagination {
    meta: Meta;
}
export declare class ListInputDTO {
    page?: number;
    limit?: number;
    sortBy?: [string, string][];
    searchBy?: string[];
    search?: string;
    filter?: {
        [column: string]: string | string[];
    };
    select?: string[];
    cursor?: string;
    cursorColumn?: string;
    cursorDirection?: 'before' | 'after';
    path: string;
}
export {};
