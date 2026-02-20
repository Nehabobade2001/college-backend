export declare enum SubscriptionStatus {
    active = "active",
    inactive = "inactive",
    expired = "expired"
}
export declare class CreateSubscriptionDto {
    name: string;
    price: number;
    discountedPrice?: number;
    duration: number;
    planIds: number[];
    couponCode?: string | null;
}
export declare class UpdateSubscriptionDto extends CreateSubscriptionDto {
    id: number;
}
export declare class SubscriptionStatusDto {
    ids: number[];
    status: SubscriptionStatus;
}
