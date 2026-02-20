import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}

registerEnumType(DiscountType, {
  name: 'DiscountType',
  description: 'Type of discount',
});

@Entity('coupons')
@ObjectType()
export class Coupon {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  code: string;

  @Field()
  @Column({ type: 'varchar', length: 255, unique: true })
  couponCode: string;

  @Field(() => DiscountType)
  @Column({ type: 'varchar' })
  discountType: DiscountType;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountValue: number;

  @Field()
  @Column({ type: 'varchar' })
  status: 'active' | 'inactive' | 'expired';

  @Field()
  @Column({ type: 'timestamp' })
  validFrom: Date;

  @Field()
  @Column({ type: 'timestamp' })
  validTo: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}
