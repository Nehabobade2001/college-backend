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
exports.PlanService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const Coupon_1 = require("../../entities/Coupon");
const Plan_1 = require("../../entities/Plan");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
const Package_1 = require("../../entities/Package");
let PlanService = class PlanService {
    constructor(PlanRepository) {
        this.PlanRepository = PlanRepository;
    }
    async create(planData) {
        const queryRunner = this.PlanRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const existingCoupon = planData.couponCode
                ? await manager.findOne(Coupon_1.Coupon, {
                    where: { couponCode: planData.couponCode },
                })
                : null;
            if (planData.couponCode && !existingCoupon) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
            }
            const existingPackage = await manager.findOne(Package_1.Package, {
                where: planData.packageId
                    ? { id: planData.packageId }
                    : { id: (0, typeorm_2.IsNull)() },
            });
            console.log('existingPackage', existingPackage);
            if (!existingPackage) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
            }
            if (planData.discountedPrice > planData.price) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE);
            }
            const existingPlan = await manager.findOne(Plan_1.Plan, {
                where: {
                    name: planData.name,
                },
            });
            if (existingPlan) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NAME_ALREADY_EXISTS, {
                    name: planData.name,
                });
            }
            const plan = manager.create(Plan_1.Plan, {
                ...planData,
                status: 'active',
                packageId: existingPackage.id,
                couponCode: existingCoupon?.couponCode ?? null,
            });
            const savedPlan = await manager.save(plan);
            await queryRunner.commitTransaction();
            return savedPlan;
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
        return (0, nestjs_paginate_1.paginate)(query, this.PlanRepository, {
            relations: ['package', 'coupon'],
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'name', 'status', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['name', 'status'],
        });
    }
    async findById(id) {
        const queryRunner = this.PlanRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const plan = await manager.findOne(Plan_1.Plan, {
                where: { id: id ?? null },
                relations: ['package', 'coupon'],
            });
            if (!plan) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            await queryRunner.commitTransaction();
            return plan;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(planData) {
        const queryRunner = this.PlanRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const existingPlan = await manager.findOne(Plan_1.Plan, {
                where: { id: planData.id ?? null },
            });
            if (!existingPlan) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            const existingCoupon = planData.couponCode
                ? await manager.findOne(Coupon_1.Coupon, {
                    where: { couponCode: planData.couponCode },
                })
                : null;
            if (planData.couponCode && !existingCoupon) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
            }
            const existingPackage = await manager.findOne(Plan_1.Plan, {
                where: { id: planData.packageId ?? null },
            });
            if (!existingPackage) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
            }
            if (planData.discountedPrice > planData.price) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE);
            }
            manager.merge(Plan_1.Plan, existingPlan, {
                ...planData,
                status: 'active',
                packageId: existingPackage.id,
                couponCode: existingCoupon?.couponCode ?? null,
            });
            const savedPlan = await manager.save(existingPlan);
            await queryRunner.commitTransaction();
            return savedPlan;
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
        const queryRunner = this.PlanRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const plans = await manager.find(Plan_1.Plan, {
                where: idArray.map((id) => ({ id })),
            });
            if (plans.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            await manager.softDelete(Plan_1.Plan, idArray);
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
        const queryRunner = this.PlanRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const plans = await manager.find(Plan_1.Plan, {
                where: idArray.map((id) => ({ id })),
                withDeleted: true,
            });
            if (plans.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            if (plans.some((plan) => plan.deletedAt === null)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_CAN_NOT_BE_HARD_DELETED);
            }
            await manager.delete(Plan_1.Plan, idArray);
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
        const plans = await this.PlanRepository.find({
            where: idArray.map((id) => ({ id })),
            withDeleted: true,
        });
        if (plans.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
        }
        await this.PlanRepository.restore(idArray);
    }
    async listTrashedWithPagination(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.PlanRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'name', 'status', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ],
            },
            searchableColumns: ['name', 'status'],
            withDeleted: true,
            where: { deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
        });
    }
    async enablePlan(data) {
        const queryRunner = this.PlanRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const plans = await manager.find(Plan_1.Plan, {
                where: idArray.map((id) => ({ id })),
            });
            if (plans.length !== idArray.length || plans.some((p) => !p || !p.id)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            const updatedPlans = await manager.save(plans.map((plan) => manager.merge(Plan_1.Plan, plan, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedPlans;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async assignCouponCodeToPlan(planId, couponCode) {
        const queryRunner = this.PlanRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const plan = await manager.findOne(Plan_1.Plan, {
                where: { id: planId ?? null },
            });
            if (!plan) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            const coupon = await manager.findOne(Coupon_1.Coupon, {
                where: { couponCode: couponCode ?? null },
            });
            if (!coupon) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_COUPON_CODE, {
                    couponCode: couponCode,
                });
            }
            plan.couponCode = couponCode;
            plan.discountedPrice = plan.price - coupon.discountValue;
            const updatedPlan = await manager.save(plan);
            await queryRunner.commitTransaction();
            return updatedPlan;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.PlanService = PlanService;
exports.PlanService = PlanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Plan_1.Plan)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlanService);
//# sourceMappingURL=plan.service.js.map