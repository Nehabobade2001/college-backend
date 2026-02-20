export declare enum PlanStatus {
    active = "active",
    inactive = "inactive",
    expired = "expired"
}
export declare class CreatePlanDto {
    name: string;
    description?: string;
    price: number;
    discountedPrice?: number;
    duration: number;
    couponCode?: string | null;
    packageId: number;
}
export declare class UpdatePlanDto extends CreatePlanDto {
    id: number;
}
export declare class PlanStatusDto {
    ids: number[];
    status: PlanStatus;
}
