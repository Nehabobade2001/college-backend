import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CouponStatusDto, CreateCouponDto, UpdateCouponDto } from './coupon.dto';
import { Coupon } from '@/entities/Coupon';
export declare class CouponService {
    private couponRepository;
    constructor(couponRepository: Repository<Coupon>);
    create(couponData: CreateCouponDto): Promise<Coupon>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Coupon>>;
    findById(id: number): Promise<Coupon>;
    update(couponData: UpdateCouponDto): Promise<Coupon>;
    delete(ids: number | number[]): Promise<boolean>;
    hardDelete(ids: number | number[]): Promise<boolean>;
    restore(ids: number | number[]): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<Coupon>>;
    enableCoupon(data: CouponStatusDto): Promise<Coupon[]>;
    dropdownCouponList(query: PaginateQuery): Promise<Paginated<Coupon>>;
}
