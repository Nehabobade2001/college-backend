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
exports.PlanResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const plan_dto_1 = require("./plan.dto");
const Plan_1 = require("../../entities/Plan");
const plan_service_1 = require("./plan.service");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let PlanResolver = class PlanResolver {
    constructor(PlanService) {
        this.PlanService = PlanService;
    }
    async createPlan(createPlanInput) {
        return this.PlanService.create(createPlanInput);
    }
    async paginatedPlans(listInputDTO) {
        const paginationResult = await this.PlanService.listWithPagination(listInputDTO);
        return {
            data: paginationResult.data,
            meta: {
                totalItems: paginationResult.meta.totalItems,
                totalPages: paginationResult.meta.totalPages,
                currentPage: paginationResult.meta.currentPage,
                limit: paginationResult.meta.itemsPerPage,
            },
        };
    }
    async findPlanById(id) {
        return this.PlanService.findById(id);
    }
    async updatePlan(updatePlanInput) {
        return this.PlanService.update(updatePlanInput);
    }
    async changePlanStatus(updatePlanStatusInput) {
        const plans = await this.PlanService.enablePlan(updatePlanStatusInput);
        if (!plans.length || plans.some((p) => !p || !p.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PLAN_NOT_FOUND);
        }
        return plans.length === 1 ? plans[0] : { data: plans };
    }
    async deletePlan(ids) {
        return this.PlanService.delete(ids);
    }
    async hardDeletePlan(ids) {
        return this.PlanService.hardDelete(ids);
    }
    async restorePlan(ids) {
        await this.PlanService.restore(ids);
        return true;
    }
    async trashedPlans(listInputDTO) {
        const paginationResult = await this.PlanService.listTrashedWithPagination(listInputDTO);
        return {
            data: paginationResult.data,
            meta: {
                totalItems: paginationResult.meta.totalItems,
                totalPages: paginationResult.meta.totalPages,
                currentPage: paginationResult.meta.currentPage,
                limit: paginationResult.meta.itemsPerPage,
            },
        };
    }
    async paginatedPlansForList(listInputDTO) {
        const paginationResult = await this.PlanService.listWithPagination(listInputDTO);
        return {
            data: paginationResult.data,
            meta: {
                totalItems: paginationResult.meta.totalItems,
                totalPages: paginationResult.meta.totalPages,
                currentPage: paginationResult.meta.currentPage,
                limit: paginationResult.meta.itemsPerPage,
            },
        };
    }
    async applyCouponToPlan(planId, couponCode) {
        return this.PlanService.assignCouponCodeToPlan(planId, couponCode);
    }
};
exports.PlanResolver = PlanResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Plan_1.Plan),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Create'),
    __param(0, (0, graphql_1.Args)('createPlanInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.CreatePlanDto]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "createPlan", null);
__decorate([
    (0, graphql_1.Query)(() => Plan_1.PaginatedPlans),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "paginatedPlans", null);
__decorate([
    (0, graphql_1.Query)(() => Plan_1.Plan),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Read'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "findPlanById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Plan_1.Plan),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Update'),
    __param(0, (0, graphql_1.Args)('updatePlanInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.UpdatePlanDto]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "updatePlan", null);
__decorate([
    (0, graphql_1.Mutation)(() => Plan_1.PlanOrPlans),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Action'),
    __param(0, (0, graphql_1.Args)('updatePlanStatusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.PlanStatusDto]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "changePlanStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "deletePlan", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "hardDeletePlan", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Restore'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "restorePlan", null);
__decorate([
    (0, graphql_1.Query)(() => Plan_1.PaginatedPlans),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "trashedPlans", null);
__decorate([
    (0, graphql_1.Query)(() => Plan_1.PaginatedPlans),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "paginatedPlansForList", null);
__decorate([
    (0, graphql_1.Mutation)(() => Plan_1.Plan),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Plan:Create', 'MasterApp:Plan:Read'),
    __param(0, (0, graphql_1.Args)('planId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('couponCode', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], PlanResolver.prototype, "applyCouponToPlan", null);
exports.PlanResolver = PlanResolver = __decorate([
    (0, graphql_1.Resolver)(() => Plan_1.Plan),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanResolver);
//# sourceMappingURL=plan.resolver.js.map