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
exports.DashboardResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const dashboard_service_1 = require("./dashboard.service");
const Dashboard_1 = require("../../entities/Dashboard");
const CurrentUser_1 = require("../../common/decorators/CurrentUser");
const User_1 = require("../../entities/User");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
let DashboardResolver = class DashboardResolver {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async dashboardCount(currentUser, filters) {
        return await this.dashboardService.getDashboardCount(currentUser, filters);
    }
};
exports.DashboardResolver = DashboardResolver;
__decorate([
    (0, graphql_1.Query)(() => Dashboard_1.DashboardCount),
    __param(0, (0, CurrentUser_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('filters', {
        type: () => Dashboard_1.ReportFilters,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.User, Object]),
    __metadata("design:returntype", Promise)
], DashboardResolver.prototype, "dashboardCount", null);
exports.DashboardResolver = DashboardResolver = __decorate([
    (0, graphql_1.Resolver)(() => Dashboard_1.DashboardCount),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardResolver);
//# sourceMappingURL=dashboard.resolver.js.map