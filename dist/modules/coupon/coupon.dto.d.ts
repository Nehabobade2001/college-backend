export declare enum CouponStatus {
    active = "active",
    inactive = "inactive",
    expired = "expired",
    used = "used"
}
export declare class CreateCouponDto {
    couponCode: string;
    description?: string;
    discountValue: number;
    minOrderAmount: number;
    usageLimit: number;
    startDate: string;
    endDate: string;
}
export declare class UpdateCouponDto extends CreateCouponDto {
    id: number;
}
export declare class CouponStatusDto {
    ids: number[];
    status: CouponStatus;
}
