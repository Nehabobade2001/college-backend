"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const Organization_1 = require("../../entities/Organization");
const Role_1 = require("../../entities/Role");
const User_1 = require("../../entities/User");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dashboard_resolver_1 = require("./dashboard.resolver");
const dashboard_service_1 = require("./dashboard.service");
const Permissions_1 = require("../../entities/Permissions");
const Project_1 = require("../../entities/Project");
const RolePermissions_1 = require("../../entities/RolePermissions");
const UserRole_1 = require("../../entities/UserRole");
const Coupon_1 = require("../../entities/Coupon");
const Module_1 = require("../../entities/Module");
const Offer_1 = require("../../entities/Offer");
const Package_1 = require("../../entities/Package");
const PackageModule_1 = require("../../entities/PackageModule");
const Plan_1 = require("../../entities/Plan");
const Subscription_1 = require("../../entities/Subscription");
const SubscriptionPlan_1 = require("../../entities/SubscriptionPlan");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                User_1.User,
                Role_1.Role,
                Project_1.Project,
                Organization_1.Organization,
                Permissions_1.Permissions,
                RolePermissions_1.RolePermissions,
                UserRole_1.UserRole,
                Coupon_1.Coupon,
                Module_1.ApplicationModule,
                Offer_1.Offer,
                Package_1.Package,
                PackageModule_1.PackageModule,
                Plan_1.Plan,
                Subscription_1.Subscriptions,
                SubscriptionPlan_1.SubscriptionPlan,
            ]),
        ],
        providers: [dashboard_service_1.DashboardService, dashboard_resolver_1.DashboardResolver],
        exports: [dashboard_service_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map