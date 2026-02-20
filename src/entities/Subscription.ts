import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('subscriptions')
@ObjectType()
export class Subscriptions {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  planName: string;

  @Field()
  @Column({ type: 'varchar' })
  status: 'active' | 'inactive' | 'expired' | 'cancelled';

  @Column({ type: 'int' })
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.subscriptions)
  user: User;

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  couponCode: string;

  @Field()
  @Column({ type: 'timestamp' })
  startDate: Date;

  @Field()
  @Column({ type: 'timestamp' })
  endDate: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
