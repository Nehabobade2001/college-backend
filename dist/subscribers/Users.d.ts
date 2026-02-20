import { User } from '@/entities/User';
import { EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
export declare class UsersSubscriber implements EntitySubscriberInterface<User> {
    listenTo(): typeof User;
    beforeInsert(event: InsertEvent<User>): void;
    afterInsert(event: InsertEvent<User>): void;
    beforeUpdate(event: UpdateEvent<User>): void;
    afterUpdate(event: UpdateEvent<User>): void;
    beforeRemove(event: RemoveEvent<User>): void;
    afterRemove(event: RemoveEvent<User>): void;
}
