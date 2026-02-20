import { Subscriptions } from '@/entities/Subscription';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto, SubscriptionStatusDto, UpdateSubscriptionDto } from './subscription.dto';
import { User } from '@/entities/User';
export declare class SubscriptionService {
    private SubscriptionRepository;
    constructor(SubscriptionRepository: Repository<Subscriptions>);
    create(SubscriptionData: CreateSubscriptionDto, currentUser: User): Promise<Subscriptions>;
    listWithPagination(query: PaginateQuery): Promise<Paginated<Subscriptions>>;
    findById(id: number): Promise<Subscriptions>;
    update(SubscriptionData: UpdateSubscriptionDto, currentUser: User): Promise<Subscriptions>;
    delete(ids: number | number[]): Promise<boolean>;
    hardDelete(ids: number | number[]): Promise<boolean>;
    restore(ids: number | number[]): Promise<void>;
    listTrashedWithPagination(query: PaginateQuery): Promise<Paginated<Subscriptions>>;
    enableSubscription(data: SubscriptionStatusDto): Promise<Subscriptions[]>;
    assignPlanInSubscription(subscriptionId: number, planIds: number[]): Promise<Subscriptions>;
    createSubscriptionWithPlans(SubscriptionData: CreateSubscriptionDto, currentUser: User, planIds: number[]): Promise<Subscriptions>;
}
