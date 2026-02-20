import { WithPagination } from '@/common/paginationDto/withPagination';
export declare class Offer {
    id: number;
    title: string;
    description: string;
    offerType: 'PERCENTAGE' | 'FIXED_AMOUNT' | null | undefined;
    discountPercent: number;
    discountValue: number;
    usageLimit: number;
    status: 'active' | 'inactive' | 'expired';
    startDate: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class PaginatedOffers extends WithPagination {
    data: Offer[];
}
export type OfferKey = keyof Offer;
export declare class OfferArray {
    data: Offer[];
}
export declare const OfferUnion: Offer | OfferArray;
