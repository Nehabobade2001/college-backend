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
exports.SubscriptionResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const subscription_dto_1 = require("./subscription.dto");
const Subscription_1 = require("../../entities/Subscription");
const subscription_service_1 = require("./subscription.service");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const CurrentUser_1 = require("../../common/decorators/CurrentUser");
const User_1 = require("../../entities/User");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let SubscriptionResolver = class SubscriptionResolver {
    constructor(SubscriptionService) {
        this.SubscriptionService = SubscriptionService;
    }
    async createSubscription(createSubscriptionInput, user) {
        return this.SubscriptionService.create(createSubscriptionInput, user);
    }
    async paginatedSubscriptions(listInputDTO) {
        const paginationResult = await this.SubscriptionService.listWithPagination(listInputDTO);
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
    async findSubscriptionById(id) {
        return this.SubscriptionService.findById(id);
    }
    async updateSubscription(updateSubscriptionInput, user) {
        return this.SubscriptionService.update(updateSubscriptionInput, user);
    }
    async changeSubscriptionStatus(updateSubscriptionStatusInput) {
        const subs = await this.SubscriptionService.enableSubscription(updateSubscriptionStatusInput);
        if (!subs.length || subs.some((s) => !s || !s.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.SUBSCRIPTION_NOT_FOUND);
        }
        return subs.length === 1 ? subs[0] : { data: subs };
    }
    async deleteSubscription(ids) {
        return this.SubscriptionService.delete(ids);
    }
    async hardDeleteSubscription(ids) {
        return this.SubscriptionService.hardDelete(ids);
    }
    async restoreSubscription(ids) {
        await this.SubscriptionService.restore(ids);
        return true;
    }
    async trashedSubscriptions(listInputDTO) {
        const paginationResult = await this.SubscriptionService.listTrashedWithPagination(listInputDTO);
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
    async assignPlanToSubscription(SubscriptionId, planIds) {
        return this.SubscriptionService.assignPlanInSubscription(SubscriptionId, planIds);
    }
    async createSubscriptionWithPlans(createSubscriptionInput, planIds, user) {
        return this.SubscriptionService.createSubscriptionWithPlans(createSubscriptionInput, user, planIds);
    }
};
exports.SubscriptionResolver = SubscriptionResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Subscription_1.Subscriptions),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Create'),
    __param(0, (0, graphql_1.Args)('createSubscriptionInput')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.CreateSubscriptionDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "createSubscription", null);
__decorate([
    (0, graphql_1.Query)(() => Subscription_1.PaginatedSubscriptions),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "paginatedSubscriptions", null);
__decorate([
    (0, graphql_1.Query)(() => Subscription_1.Subscriptions),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Read'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "findSubscriptionById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Subscription_1.Subscriptions),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Update'),
    __param(0, (0, graphql_1.Args)('updateSubscriptionInput')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.UpdateSubscriptionDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "updateSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => Subscription_1.SubscriptionsUnion),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Action'),
    __param(0, (0, graphql_1.Args)('updateSubscriptionStatusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.SubscriptionStatusDto]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "changeSubscriptionStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "deleteSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "hardDeleteSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Restore'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "restoreSubscription", null);
__decorate([
    (0, graphql_1.Query)(() => Subscription_1.PaginatedSubscriptions),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "trashedSubscriptions", null);
__decorate([
    (0, graphql_1.Mutation)(() => Subscription_1.Subscriptions),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Read', 'MasterApp:Plan:Read'),
    __param(0, (0, graphql_1.Args)('SubscriptionId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('planIds', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "assignPlanToSubscription", null);
__decorate([
    (0, graphql_1.Mutation)(() => Subscription_1.Subscriptions),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Subscription:Create', 'MasterApp:Plan:Read'),
    __param(0, (0, graphql_1.Args)('createSubscriptionInput')),
    __param(1, (0, graphql_1.Args)('planIds', { type: () => [graphql_1.Int], nullable: true })),
    __param(2, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [subscription_dto_1.CreateSubscriptionDto, Array, User_1.User]),
    __metadata("design:returntype", Promise)
], SubscriptionResolver.prototype, "createSubscriptionWithPlans", null);
exports.SubscriptionResolver = SubscriptionResolver = __decorate([
    (0, graphql_1.Resolver)(() => Subscription_1.Subscriptions),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [subscription_service_1.SubscriptionService])
], SubscriptionResolver);
//# sourceMappingURL=subscription.resolver.js.map