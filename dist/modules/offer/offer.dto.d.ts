import { DiscountType } from '@/entities/Coupon';
export declare enum OfferStatus {
    active = "active",
    inactive = "inactive",
    expired = "expired"
}
export declare enum OfferTypeStatus {
    DISCOUNT = "DISCOUNT",
    CASHBACK = "CASHBACK"
}
export declare class CreateOfferDto {
    title: string;
    description?: string;
    offerType: DiscountType;
    discountValue: number;
    discountPercent: number;
    usageLimit: number;
    startDate: string;
    endDate: string;
}
export declare class UpdateOfferDto extends CreateOfferDto {
    id: number;
}
export declare class OfferStatusDto {
    ids: number[];
    status: OfferStatus;
}
