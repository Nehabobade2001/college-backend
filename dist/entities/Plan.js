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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanOrPlans = exports.PaginatedPlans = exports.PlanArray = exports.Plan = void 0;
const withPagination_1 = require("../common/paginationDto/withPagination");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Coupon_1 = require("./Coupon");
const Package_1 = require("./Package");
const Subscription_1 = require("./Subscription");
const helper_1 = require("../common/helpers/helper");
let Plan = class Plan {
};
exports.Plan = Plan;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Plan.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Plan.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Plan.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], Plan.prototype, "duration", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Plan.prototype, "discountedPrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Plan.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Package_1.Package, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Package_1.Package, (pkg) => pkg.plans, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'packageId' }),
    __metadata("design:type", Package_1.Package)
], Plan.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Plan.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Coupon_1.Coupon, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'couponCode', referencedColumnName: 'couponCode' }),
    (0, graphql_1.Field)(() => Coupon_1.Coupon, { nullable: true }),
    __metadata("design:type", Coupon_1.Coupon)
], Plan.prototype, "coupon", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "couponCode", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Subscription_1.Subscriptions, (subs) => subs.plans, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Plan.prototype, "subscriptions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Plan.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Plan.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Plan.prototype, "deletedAt", void 0);
exports.Plan = Plan = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('plans'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Plan);
let PlanArray = class PlanArray {
};
exports.PlanArray = PlanArray;
__decorate([
    (0, graphql_1.Field)(() => [Plan]),
    __metadata("design:type", Array)
], PlanArray.prototype, "data", void 0);
exports.PlanArray = PlanArray = __decorate([
    (0, graphql_1.ObjectType)()
], PlanArray);
let PaginatedPlans = class PaginatedPlans extends withPagination_1.WithPagination {
};
exports.PaginatedPlans = PaginatedPlans;
__decorate([
    (0, graphql_1.Field)(() => [Plan]),
    __metadata("design:type", Array)
], PaginatedPlans.prototype, "data", void 0);
exports.PaginatedPlans = PaginatedPlans = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedPlans);
exports.PlanOrPlans = (0, helper_1.createSmartUnion)('PlanOrPlans', () => Plan, () => PlanArray, 'data');
//# sourceMappingURL=Plan.js.map