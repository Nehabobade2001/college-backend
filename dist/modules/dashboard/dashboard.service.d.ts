import { Coupon } from '@/entities/Coupon';
import { DashboardCount } from '@/entities/Dashboard';
import { ApplicationModule } from '@/entities/Module';
import { Offer } from '@/entities/Offer';
import { Organization } from '@/entities/Organization';
import { Package } from '@/entities/Package';
import { PackageModule } from '@/entities/PackageModule';
import { Permissions } from '@/entities/Permissions';
import { Plan } from '@/entities/Plan';
import { Project } from '@/entities/Project';
import { Role } from '@/entities/Role';
import { RolePermissions } from '@/entities/RolePermissions';
import { Subscriptions } from '@/entities/Subscription';
import { SubscriptionPlan } from '@/entities/SubscriptionPlan';
import { User } from '@/entities/User';
import { UserRole } from '@/entities/UserRole';
import { Repository } from 'typeorm';
export declare class DashboardService {
    private readonly userRepository;
    private readonly userRoleRepository;
    private readonly roleRepository;
    private readonly projectRepository;
    private readonly organizationRepository;
    private readonly permissionRepository;
    private readonly rolePermissionRepository;
    private readonly couponRepository;
    private readonly applicationModuleRepository;
    private readonly offerRepository;
    private readonly packageRepository;
    private readonly planRepository;
    private readonly subscriptionRepository;
    private readonly packageModuleRepository;
    private readonly subscriptionPlanRepository;
    constructor(userRepository: Repository<User>, userRoleRepository: Repository<UserRole>, roleRepository: Repository<Role>, projectRepository: Repository<Project>, organizationRepository: Repository<Organization>, permissionRepository: Repository<Permissions>, rolePermissionRepository: Repository<RolePermissions>, couponRepository: Repository<Coupon>, applicationModuleRepository: Repository<ApplicationModule>, offerRepository: Repository<Offer>, packageRepository: Repository<Package>, planRepository: Repository<Plan>, subscriptionRepository: Repository<Subscriptions>, packageModuleRepository: Repository<PackageModule>, subscriptionPlanRepository: Repository<SubscriptionPlan>);
    getDashboardCount(currentUser: User, filters: {
        startDate?: string;
        endDate?: string;
    }): Promise<DashboardCount | undefined>;
}
