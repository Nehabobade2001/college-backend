import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PaginatedPlans } from '@/entities/Plan';
import { PlanService } from './plan.service';
export declare class PlanController {
    private readonly PlanService;
    constructor(PlanService: PlanService);
    paginatedPlansList(listInputDTO: ListInputDTO): Promise<PaginatedPlans>;
}
