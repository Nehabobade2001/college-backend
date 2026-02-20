import { Plan } from '@/entities/Plan';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreatePlanDto, PlanStatusDto, UpdatePlanDto } from './plan.dto';
export declare class PlanService {
    private PlanRepository;
    constructor(PlanRepository: Repository<Plan>);
    create(planData: CreatePlanDto): Promise<Plan>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Plan>>;
    findById(id: number): Promise<Plan>;
    update(planData: UpdatePlanDto): Promise<Plan>;
    delete(ids: number | number[]): Promise<boolean>;
    hardDelete(ids: number | number[]): Promise<boolean>;
    restore(ids: number | number[]): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<Plan>>;
    enablePlan(data: PlanStatusDto): Promise<Plan[]>;
    assignCouponCodeToPlan(planId: number, couponCode: string): Promise<Plan>;
}
