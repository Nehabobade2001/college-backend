import { WithPagination } from '@/common/paginationDto/withPagination';
import { Coupon } from './Coupon';
import { Package } from './Package';
import { Subscriptions } from './Subscription';
export declare class Plan {
    id: number;
    name: string;
    description: string;
    price: number;
    duration: number;
    discountedPrice: number | null | undefined;
    status: 'active' | 'inactive' | 'expired';
    package: Package;
    packageId: number;
    coupon: Coupon;
    couponCode: string | null;
    subscriptions: Subscriptions[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
export declare class PlanArray {
    data: Plan[];
}
export declare class PaginatedPlans extends WithPagination {
    data: Plan[];
}
export type PlanKey = keyof Plan;
export declare const PlanOrPlans: Plan | PlanArray;
