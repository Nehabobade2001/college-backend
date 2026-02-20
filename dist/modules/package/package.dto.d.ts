import { DiscountType } from '@/entities/Coupon';
export declare enum PackageStatus {
    active = "active",
    inactive = "inactive",
    blocked = "blocked",
    pending = "pending"
}
export declare class CreatePackageDto {
    name: string;
    description?: string;
    price: number;
    discountedPrice: number;
    offerType?: DiscountType;
    offerExpiryDate?: string;
    offerDescription?: string;
    moduleIds: number[];
}
export declare class UpdatePackageDto extends CreatePackageDto {
    id: number;
}
export declare class PackageStatusDto {
    ids: number[];
    status: PackageStatus;
}
