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
exports.SubscriptionService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const Subscription_1 = require("../../entities/Subscription");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
const Plan_1 = require("../../entities/Plan");
const SubscriptionPlan_1 = require("../../entities/SubscriptionPlan");
const Coupon_1 = require("../../entities/Coupon");
let SubscriptionService = class SubscriptionService {
    constructor(SubscriptionRepository) {
        this.SubscriptionRepository = SubscriptionRepository;
    }
    async create(SubscriptionData, currentUser) {
        const queryRunner = this.SubscriptionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const existingPlan = await manager.find(Plan_1.Plan, {
                where: { id: (0, typeorm_2.In)(SubscriptionData.planIds) },
            });
            if (!existingPlan) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            const existingCoupon = SubscriptionData.couponCode
                ? await manager.findOne(Coupon_1.Coupon, {
                    where: { couponCode: SubscriptionData.couponCode },
                })
                : null;
            if (SubscriptionData.couponCode && !existingCoupon) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_COUPON_CODE, {
                    couponCode: SubscriptionData.couponCode,
                });
            }
            if (SubscriptionData.discountedPrice > SubscriptionData.price) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE);
            }
            const Subscription = manager.create(Subscription_1.Subscriptions, {
                ...SubscriptionData,
                status: 'active',
                organizationId: currentUser.organizationId,
                userId: currentUser.id,
                plans: existingPlan,
                couponCode: existingCoupon?.couponCode ?? null,
            });
            const savedSubscription = await manager.save(Subscription);
            await queryRunner.commitTransaction();
            const Subs = await manager.findOne(Subscription_1.Subscriptions, {
                where: { id: savedSubscription.id },
                relations: ['plans'],
            });
            return Subs;
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
        const p = await (0, nestjs_paginate_1.paginate)(query, this.SubscriptionRepository, {
            relations: ['plans', 'coupon'],
            defaultLimit: limit,
            maxLimit: 50,
            sortableColumns: ['id', 'name', 'status', 'createdAt'],
            defaultSortBy: [['createdAt', 'DESC']],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['name', 'status'],
        });
        return p;
    }
    async findById(id) {
        const queryRunner = this.SubscriptionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const Subscription = await manager.findOne(Subscription_1.Subscriptions, {
                where: { id: id ?? null },
                relations: ['plans'],
            });
            if (!Subscription) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_NOT_FOUND);
            }
            await queryRunner.commitTransaction();
            return Subscription;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(SubscriptionData, currentUser) {
        const queryRunner = this.SubscriptionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const Subscription = await manager.findOne(Subscription_1.Subscriptions, {
                where: { id: SubscriptionData.id ?? null },
            });
            if (!Subscription) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_NOT_FOUND);
            }
            const existingPlan = await manager.find(Plan_1.Plan, {
                where: { id: (0, typeorm_2.In)(SubscriptionData.planIds) },
            });
            if (!existingPlan) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            const existingCoupon = SubscriptionData.couponCode
                ? await manager.findOne(Coupon_1.Coupon, {
                    where: { couponCode: SubscriptionData.couponCode },
                })
                : null;
            if (SubscriptionData.couponCode && !existingCoupon) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.COUPON_NOT_FOUND);
            }
            if (SubscriptionData.discountedPrice > SubscriptionData.price) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE);
            }
            manager.merge(Subscription_1.Subscriptions, Subscription, {
                ...SubscriptionData,
                organizationId: currentUser.organizationId,
                userId: currentUser.id,
                plans: existingPlan,
                couponCode: existingCoupon?.couponCode ?? null,
            });
            const savedSubscription = await manager.save(Subscription);
            await queryRunner.commitTransaction();
            const Subs = await manager.findOne(Subscription_1.Subscriptions, {
                where: { id: savedSubscription.id },
                relations: ['plans'],
            });
            return Subs;
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
        const queryRunner = this.SubscriptionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const Subscription = await manager.find(Subscription_1.Subscriptions, {
                where: idArray.map((id) => ({ id })),
            });
            if (Subscription.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_NOT_FOUND);
            }
            await manager.softDelete(Subscription_1.Subscriptions, ids);
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
        const queryRunner = this.SubscriptionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const Subscription = await manager.find(Subscription_1.Subscriptions, {
                where: idArray.map((id) => ({ id })),
                withDeleted: true,
            });
            if (Subscription.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_NOT_FOUND);
            }
            if (Subscription.some((plan) => plan.deletedAt === null)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_CAN_NOT_BE_HARD_DELETED);
            }
            await manager.delete(Subscription_1.Subscriptions, ids);
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
        const Subscription = await this.SubscriptionRepository.find({
            where: idArray.map((id) => ({ id })),
            withDeleted: true,
        });
        if (Subscription.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_NOT_FOUND);
        }
        await this.SubscriptionRepository.restore(ids);
    }
    async listTrashedWithPagination(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.SubscriptionRepository, {
            relations: ['plans'],
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
    async enableSubscription(data) {
        const queryRunner = this.SubscriptionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const Subscriptionss = await manager.find(Subscription_1.Subscriptions, {
                where: idArray.map((id) => ({ id })),
            });
            if (Subscriptionss.length !== idArray.length ||
                Subscriptionss.some((p) => !p || !p.id)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_NOT_FOUND);
            }
            const updatedSubscription = await manager.save(Subscriptionss.map((Subscription) => manager.merge(Subscription_1.Subscriptions, Subscription, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedSubscription;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async assignPlanInSubscription(subscriptionId, planIds) {
        const queryRunner = this.SubscriptionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const subs = await manager.findOne(Subscription_1.Subscriptions, {
                where: { id: subscriptionId ?? null },
            });
            if (!subs) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_NOT_FOUND);
            }
            const plans = await manager.findBy(Plan_1.Plan, {
                id: (0, typeorm_2.In)(planIds),
            });
            console.log(plans, 'plans');
            if (plans.length !== planIds.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
            }
            const existingPlans = await manager.findBy(SubscriptionPlan_1.SubscriptionPlan, {
                subscriptionId,
                planId: (0, typeorm_2.In)(planIds),
            });
            const existingPlanIds = existingPlans.map((pm) => pm.planId);
            const newPlanIds = planIds.filter((id) => !existingPlanIds.includes(id));
            console.log(newPlanIds, 'newPlanIds');
            if (newPlanIds.length > 0) {
                const subsPlan = newPlanIds.map((planId) => manager.create(SubscriptionPlan_1.SubscriptionPlan, { subscriptionId, planId }));
                await manager.save(subsPlan);
            }
            const updatedSubscription = await manager.findOne(Subscription_1.Subscriptions, {
                where: { id: subscriptionId },
                relations: ['plans'],
            });
            await queryRunner.commitTransaction();
            return updatedSubscription;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createSubscriptionWithPlans(SubscriptionData, currentUser, planIds) {
        const queryRunner = this.SubscriptionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const Subscription = manager.create(Subscription_1.Subscriptions, {
                ...SubscriptionData,
                status: 'active',
                organizationId: currentUser.organizationId,
                userId: currentUser.id,
            });
            const savedSubscription = await manager.save(Subscription);
            if (planIds && planIds.length > 0) {
                const plans = await manager.findBy(Plan_1.Plan, {
                    id: (0, typeorm_2.In)(planIds),
                });
                if (plans.length !== planIds.length) {
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
                }
                const subsPlan = plans.map((plan) => manager.create(SubscriptionPlan_1.SubscriptionPlan, {
                    subscriptionId: savedSubscription.id,
                    planId: plan.id,
                }));
                await manager.save(subsPlan);
            }
            const updatedSubscription = await manager.findOne(Subscription_1.Subscriptions, {
                where: { id: savedSubscription.id },
                relations: ['plans', 'coupon'],
            });
            await queryRunner.commitTransaction();
            return updatedSubscription;
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
exports.SubscriptionService = SubscriptionService;
exports.SubscriptionService = SubscriptionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Subscription_1.Subscriptions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubscriptionService);
//# sourceMappingURL=subscription.service.js.map