import { DashboardService } from './dashboard.service';
import { DashboardCount } from '@/entities/Dashboard';
import { User } from '@/entities/User';
export declare class DashboardResolver {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    dashboardCount(currentUser: User, filters: any): Promise<DashboardCount>;
}
