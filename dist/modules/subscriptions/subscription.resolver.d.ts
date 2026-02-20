import { ListInputDTO } from '@/common/paginationDto/withPagination';
import { SubscriptionStatusDto, CreateSubscriptionDto, UpdateSubscriptionDto } from './subscription.dto';
import { PaginatedSubscriptions, Subscriptions, SubscriptionsArray } from '@/entities/Subscription';
import { SubscriptionService } from './subscription.service';
import { User } from '@/entities/User';
export declare class SubscriptionResolver {
    private readonly SubscriptionService;
    constructor(SubscriptionService: SubscriptionService);
    createSubscription(createSubscriptionInput: CreateSubscriptionDto, user: User): Promise<Subscriptions>;
    paginatedSubscriptions(listInputDTO: ListInputDTO): Promise<PaginatedSubscriptions>;
    findSubscriptionById(id: number): Promise<Subscriptions>;
    updateSubscription(updateSubscriptionInput: UpdateSubscriptionDto, user: User): Promise<Subscriptions>;
    changeSubscriptionStatus(updateSubscriptionStatusInput: SubscriptionStatusDto): Promise<Subscriptions | SubscriptionsArray>;
    deleteSubscription(ids: number[]): Promise<boolean>;
    hardDeleteSubscription(ids: number[]): Promise<boolean>;
    restoreSubscription(ids: number[]): Promise<boolean>;
    trashedSubscriptions(listInputDTO: ListInputDTO): Promise<PaginatedSubscriptions>;
    assignPlanToSubscription(SubscriptionId: number, planIds: number[]): Promise<Subscriptions>;
    createSubscriptionWithPlans(createSubscriptionInput: CreateSubscriptionDto, planIds: number[], user: User): Promise<Subscriptions>;
}
