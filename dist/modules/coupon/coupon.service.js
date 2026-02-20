"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
const Coupon_1 = require("../../entities/Coupon");
let CouponService = class CouponService {
    constructor(couponRepository) {
        this.couponRepository = couponRepository;
    }
    async create(couponData) {
        const queryRunner = this.couponRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const coupon = manager.create(Coupon_1.Coupon, {
                ...couponData,
                status: 'active',
            });
            const savedCoupon = await manager.save(coupon);
            await queryRunner.commitTransaction();
            return savedCoupon;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async listWithPagination(query) {
        const limit = Math.min(query.limit ?? 50, 50);
        return (0, nestjs_paginate_1.paginate)(query, this.couponRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'couponCode', 'status', 'createdAt'],
            filterableColumns: {
                couponCode: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['couponCode', 'status'],
        });
    }
    async findById(id) {
        const queryRunner = this.couponRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const coupon = await manager.findOne(Coupon_1.Coupon, {
                where: { id: id ?? null },
            });
            if (!coupon) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
            }
            await queryRunner.commitTransaction();
            return coupon;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(couponData) {
        const queryRunner = this.couponRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const coupon = await manager.findOne(Coupon_1.Coupon, {
                where: { id: couponData.id ?? null },
            });
            if (!coupon) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
            }
            manager.merge(Coupon_1.Coupon, coupon, couponData);
            const savedCoupon = await manager.save(coupon);
            await queryRunner.commitTransaction();
            return savedCoupon;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async delete(ids) {
        const queryRunner = this.couponRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const coupons = await manager.find(Coupon_1.Coupon, {
                where: idArray.map((id) => ({ id })),
            });
            if (coupons.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
            }
            await manager.softDelete(Coupon_1.Coupon, idArray);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async hardDelete(ids) {
        const queryRunner = this.couponRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const coupons = await manager.find(Coupon_1.Coupon, {
                where: idArray.map((id) => ({ id })),
                withDeleted: true,
            });
            if (coupons.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
            }
            if (coupons.some((c) => c.deletedAt === null)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_CAN_NOT_BE_HARD_DELETED);
            }
            await manager.delete(Coupon_1.Coupon, ids);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async restore(ids) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const coupons = await this.couponRepository.find({
            where: idArray.map((id) => ({ id })),
            withDeleted: true,
        });
        if (coupons.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
        }
        await this.couponRepository.restore(ids);
    }
    async listTrashedWithPagination(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.couponRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'couponCode', 'status', 'createdAt'],
            filterableColumns: {
                couponCode: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ],
            },
            searchableColumns: ['couponCode', 'status'],
            withDeleted: true,
            where: { deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
        });
    }
    async enableCoupon(data) {
        const queryRunner = this.couponRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const coupons = await manager.find(Coupon_1.Coupon, {
                where: idArray.map((id) => ({ id })),
            });
            if (coupons.length !== idArray.length ||
                coupons.some((c) => !c || !c.id)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
            }
            const updatedCoupons = await manager.save(coupons.map((coupon) => manager.merge(Coupon_1.Coupon, coupon, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedCoupons;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async dropdownCouponList(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.couponRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'couponCode', 'status', 'createdAt'],
            filterableColumns: {
                couponCode: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ],
            },
            searchableColumns: ['couponCode', 'status'],
        });
    }
};
exports.CouponService = CouponService;
exports.CouponService = CouponService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Coupon_1.Coupon)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CouponService);
//# sourceMappingURL=coupon.service.js.map