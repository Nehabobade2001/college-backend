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
exports.CouponResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const coupon_dto_1 = require("./coupon.dto");
const Coupon_1 = require("../../entities/Coupon");
const coupon_service_1 = require("./coupon.service");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
let CouponResolver = class CouponResolver {
    constructor(couponService) {
        this.couponService = couponService;
    }
    async createCoupon(createCouponInput) {
        return this.couponService.create(createCouponInput);
    }
    async paginatedCoupons(listInputDTO) {
        const paginationResult = await this.couponService.listWithPagination(listInputDTO);
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
    async findCouponById(id) {
        return this.couponService.findById(id);
    }
    async updateCoupon(updateCouponInput) {
        return this.couponService.update(updateCouponInput);
    }
    async changeCouponStatus(updateCouponStatusInput) {
        const coupons = await this.couponService.enableCoupon(updateCouponStatusInput);
        return coupons.length === 1 ? coupons[0] : { data: coupons };
    }
    async deleteCoupon(ids) {
        return this.couponService.delete(ids);
    }
    async hardDeleteCoupon(ids) {
        return this.couponService.hardDelete(ids);
    }
    async restoreCoupon(ids) {
        await this.couponService.restore(ids);
        return true;
    }
    async trashedCoupons(listInputDTO) {
        const paginationResult = await this.couponService.listTrashedWithPagination(listInputDTO);
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
    async couponsDropdown(listInputDTO) {
        const paginationResult = await this.couponService.dropdownCouponList(listInputDTO);
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
};
exports.CouponResolver = CouponResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Coupon_1.Coupon),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Create'),
    __param(0, (0, graphql_1.Args)('createCouponInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_dto_1.CreateCouponDto]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "createCoupon", null);
__decorate([
    (0, graphql_1.Query)(() => Coupon_1.PaginatedCoupons),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "paginatedCoupons", null);
__decorate([
    (0, graphql_1.Query)(() => Coupon_1.Coupon),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Read'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "findCouponById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Coupon_1.Coupon),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Update'),
    __param(0, (0, graphql_1.Args)('updateCouponInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_dto_1.UpdateCouponDto]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "updateCoupon", null);
__decorate([
    (0, graphql_1.Mutation)(() => Coupon_1.CouponOrCoupons),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Action'),
    __param(0, (0, graphql_1.Args)('updateCouponStatusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [coupon_dto_1.CouponStatusDto]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "changeCouponStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "deleteCoupon", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "hardDeleteCoupon", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Restore'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "restoreCoupon", null);
__decorate([
    (0, graphql_1.Query)(() => Coupon_1.PaginatedCoupons),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "trashedCoupons", null);
__decorate([
    (0, graphql_1.Query)(() => Coupon_1.PaginatedCoupons),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Coupon:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], CouponResolver.prototype, "couponsDropdown", null);
exports.CouponResolver = CouponResolver = __decorate([
    (0, graphql_1.Resolver)(() => Coupon_1.Coupon),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [coupon_service_1.CouponService])
], CouponResolver);
//# sourceMappingURL=coupon.resolver.js.map