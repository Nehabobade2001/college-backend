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
exports.ReportFilters = exports.DashboardCount = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let DashboardCount = class DashboardCount {
};
exports.DashboardCount = DashboardCount;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "userCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "roleCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "permissionCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "assignedPermissionCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "projectCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "organizationCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "couponCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "offerCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "moduleCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "packageCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "planCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "subscriptionCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "packageModuleCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DashboardCount.prototype, "subscriptionPlanCount", void 0);
exports.DashboardCount = DashboardCount = __decorate([
    (0, graphql_1.ObjectType)()
], DashboardCount);
let ReportFilters = class ReportFilters {
};
exports.ReportFilters = ReportFilters;
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], ReportFilters.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], ReportFilters.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], ReportFilters.prototype, "month", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Number)
], ReportFilters.prototype, "year", void 0);
exports.ReportFilters = ReportFilters = __decorate([
    (0, graphql_1.InputType)()
], ReportFilters);
//# sourceMappingURL=Dashboard.js.map