import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { PlanStatusDto, CreatePlanDto, UpdatePlanDto } from './plan.dto';
import { Plan, PaginatedPlans, PlanArray } from '@/entities/Plan';
import { PlanService } from './plan.service';
export declare class PlanResolver {
    private readonly PlanService;
    constructor(PlanService: PlanService);
    createPlan(createPlanInput: CreatePlanDto): Promise<Plan>;
    paginatedPlans(listInputDTO: ListInputDTO): Promise<PaginatedPlans>;
    findPlanById(id: number): Promise<Plan>;
    updatePlan(updatePlanInput: UpdatePlanDto): Promise<Plan>;
    changePlanStatus(updatePlanStatusInput: PlanStatusDto): Promise<Plan | PlanArray>;
    deletePlan(ids: number[]): Promise<boolean>;
    hardDeletePlan(ids: number[]): Promise<boolean>;
    restorePlan(ids: number[]): Promise<boolean>;
    trashedPlans(listInputDTO: ListInputDTO): Promise<PaginatedPlans>;
    paginatedPlansForList(listInputDTO: ListInputDTO): Promise<PaginatedPlans>;
    applyCouponToPlan(planId: number, couponCode: string): Promise<Plan>;
}
