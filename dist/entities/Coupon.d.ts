export declare enum DiscountType {
    PERCENTAGE = "percentage",
    FIXED = "fixed"
}
export declare class Coupon {
    id: number;
    code: string;
    couponCode: string;
    discountType: DiscountType;
    discountValue: number;
    status: 'active' | 'inactive' | 'expired';
    validFrom: Date;
    validTo: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
