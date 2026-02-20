import { User } from './User';
export declare class Subscriptions {
    id: number;
    planName: string;
    status: 'active' | 'inactive' | 'expired' | 'cancelled';
    userId: number;
    user: User;
    couponCode: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
