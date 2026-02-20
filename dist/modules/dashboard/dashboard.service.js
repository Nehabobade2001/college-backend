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
exports.DashboardService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const Coupon_1 = require("../../entities/Coupon");
const Module_1 = require("../../entities/Module");
const Offer_1 = require("../../entities/Offer");
const Organization_1 = require("../../entities/Organization");
const Package_1 = require("../../entities/Package");
const PackageModule_1 = require("../../entities/PackageModule");
const Permissions_1 = require("../../entities/Permissions");
const Plan_1 = require("../../entities/Plan");
const Project_1 = require("../../entities/Project");
const Role_1 = require("../../entities/Role");
const RolePermissions_1 = require("../../entities/RolePermissions");
const Subscription_1 = require("../../entities/Subscription");
const SubscriptionPlan_1 = require("../../entities/SubscriptionPlan");
const User_1 = require("../../entities/User");
const UserRole_1 = require("../../entities/UserRole");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let DashboardService = class DashboardService {
    constructor(userRepository, userRoleRepository, roleRepository, projectRepository, organizationRepository, permissionRepository, rolePermissionRepository, couponRepository, applicationModuleRepository, offerRepository, packageRepository, planRepository, subscriptionRepository, packageModuleRepository, subscriptionPlanRepository) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.roleRepository = roleRepository;
        this.projectRepository = projectRepository;
        this.organizationRepository = organizationRepository;
        this.permissionRepository = permissionRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.couponRepository = couponRepository;
        this.applicationModuleRepository = applicationModuleRepository;
        this.offerRepository = offerRepository;
        this.packageRepository = packageRepository;
        this.planRepository = planRepository;
        this.subscriptionRepository = subscriptionRepository;
        this.packageModuleRepository = packageModuleRepository;
        this.subscriptionPlanRepository = subscriptionPlanRepository;
    }
    async getDashboardCount(currentUser, filters) {
        const userRoles = await this.userRoleRepository.find({
            where: { userId: currentUser.id },
        });
        if (!userRoles.length)
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_WITH_ROLE_NOT_FOUND);
        const userRoleIds = userRoles.map((userRole) => userRole.roleId);
        const isAdmin = await this.userRepository.exists({
            where: { id: (0, typeorm_2.In)(userRoleIds), userType: User_1.UserType.admin },
        });
        const getDateFilters = () => {
            const dateFilters = {};
            if (filters.startDate && filters.endDate) {
                dateFilters.createdAt = (0, typeorm_2.Between)(new Date(filters.startDate), new Date(filters.endDate));
            }
            else {
                if (filters.startDate)
                    dateFilters.createdAt = (0, typeorm_2.MoreThanOrEqual)(new Date(filters.startDate));
                if (filters.endDate)
                    dateFilters.createdAt = (0, typeorm_2.LessThanOrEqual)(new Date(filters.endDate));
            }
            return dateFilters;
        };
        const commonWhereFilter = isAdmin
            ? getDateFilters()
            : { organizationId: currentUser.organizationId, ...getDateFilters() };
        const [userCount, roleCount, projectCount, organizationCount, permissionCount, assignedPermissionCount, couponCount, offerCount, moduleCount, packageCount, planCount, subscriptionCount, packageModuleCount, subscriptionPlanCount,] = await Promise.all([
            this.userRepository.count({ where: commonWhereFilter }),
            this.roleRepository.count({ where: commonWhereFilter }),
            this.projectRepository.count({ where: commonWhereFilter }),
            this.organizationRepository.count({
                where: isAdmin ? {} : { id: currentUser.organizationId },
            }),
            this.permissionRepository
                .createQueryBuilder('permission')
                .innerJoin('permission.roles', 'role')
                .where('role.id IN (:...userRoleIds)', { userRoleIds })
                .andWhere(getDateFilters())
                .getCount(),
            this.rolePermissionRepository.count({
                where: { role: { id: (0, typeorm_2.In)(userRoleIds) }, ...getDateFilters() },
            }),
            this.couponRepository.count({
                where: isAdmin ? getDateFilters() : getDateFilters(),
            }),
            this.offerRepository.count({
                where: isAdmin ? getDateFilters() : getDateFilters(),
            }),
            this.applicationModuleRepository.count({
                where: isAdmin ? getDateFilters() : getDateFilters(),
            }),
            this.packageRepository.count({
                where: isAdmin ? getDateFilters() : getDateFilters(),
            }),
            this.planRepository.count({
                where: isAdmin ? getDateFilters() : getDateFilters(),
            }),
            this.subscriptionRepository.count({
                where: isAdmin ? getDateFilters() : getDateFilters(),
            }),
            this.packageModuleRepository.count({
                where: isAdmin ? getDateFilters() : getDateFilters(),
            }),
            this.subscriptionPlanRepository.count({
                where: isAdmin ? getDateFilters() : getDateFilters(),
            }),
        ]);
        return {
            userCount,
            roleCount,
            projectCount,
            organizationCount,
            permissionCount,
            assignedPermissionCount,
            couponCount,
            offerCount,
            moduleCount,
            packageCount,
            planCount,
            subscriptionCount,
            packageModuleCount,
            subscriptionPlanCount,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(User_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(UserRole_1.UserRole)),
    __param(2, (0, typeorm_1.InjectRepository)(Role_1.Role)),
    __param(3, (0, typeorm_1.InjectRepository)(Project_1.Project)),
    __param(4, (0, typeorm_1.InjectRepository)(Organization_1.Organization)),
    __param(5, (0, typeorm_1.InjectRepository)(Permissions_1.Permissions)),
    __param(6, (0, typeorm_1.InjectRepository)(RolePermissions_1.RolePermissions)),
    __param(7, (0, typeorm_1.InjectRepository)(Coupon_1.Coupon)),
    __param(8, (0, typeorm_1.InjectRepository)(Module_1.ApplicationModule)),
    __param(9, (0, typeorm_1.InjectRepository)(Offer_1.Offer)),
    __param(10, (0, typeorm_1.InjectRepository)(Package_1.Package)),
    __param(11, (0, typeorm_1.InjectRepository)(Plan_1.Plan)),
    __param(12, (0, typeorm_1.InjectRepository)(Subscription_1.Subscriptions)),
    __param(13, (0, typeorm_1.InjectRepository)(PackageModule_1.PackageModule)),
    __param(14, (0, typeorm_1.InjectRepository)(SubscriptionPlan_1.SubscriptionPlan)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map