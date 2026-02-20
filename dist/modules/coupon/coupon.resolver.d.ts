import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { CouponStatusDto, CreateCouponDto, UpdateCouponDto } from './coupon.dto';
import { Coupon, CouponArray, PaginatedCoupons } from '@/entities/Coupon';
import { CouponService } from './coupon.service';
export declare class CouponResolver {
    private readonly couponService;
    constructor(couponService: CouponService);
    createCoupon(createCouponInput: CreateCouponDto): Promise<Coupon>;
    paginatedCoupons(listInputDTO: ListInputDTO): Promise<PaginatedCoupons>;
    findCouponById(id: number): Promise<Coupon>;
    updateCoupon(updateCouponInput: UpdateCouponDto): Promise<Coupon>;
    changeCouponStatus(updateCouponStatusInput: CouponStatusDto): Promise<Coupon | CouponArray>;
    deleteCoupon(ids: number[]): Promise<boolean>;
    hardDeleteCoupon(ids: number[]): Promise<boolean>;
    restoreCoupon(ids: number[]): Promise<boolean>;
    trashedCoupons(listInputDTO: ListInputDTO): Promise<PaginatedCoupons>;
    couponsDropdown(listInputDTO: ListInputDTO): Promise<PaginatedCoupons>;
}
