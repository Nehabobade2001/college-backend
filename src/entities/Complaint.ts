/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'

export enum ComplaintStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export enum ComplaintPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

registerEnumType(ComplaintStatus, { name: 'ComplaintStatus' })
registerEnumType(ComplaintPriority, { name: 'ComplaintPriority' })

@ObjectType()
@Entity('complaints')
export class Complaint {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('varchar', { length: 255 })
  title: string

  @Field()
  @Column('text')
  description: string

  @Field(() => ComplaintStatus)
  @Column({ type: 'enum', enum: ComplaintStatus, default: ComplaintStatus.OPEN })
  status: ComplaintStatus

  @Field(() => ComplaintPriority)
  @Column({ type: 'enum', enum: ComplaintPriority, default: ComplaintPriority.MEDIUM })
  priority: ComplaintPriority

  @Field(() => Int)
  @Column('int')
  studentId: number

  @Field(() => Int, { nullable: true })
  @Column('int', { nullable: true })
  centerId: number

  @Field(() => Int, { nullable: true })
  @Column('int', { nullable: true })
  assignedTo: number

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  resolution: string

  @Field({ nullable: true })
  @Column('timestamp', { nullable: true })
  resolvedAt: Date

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  student: User

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  assignedUser: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}

@ObjectType()
class ComplaintMeta {
  @Field(() => Int)
  totalItems: number

  @Field(() => Int)
  totalPages: number

  @Field(() => Int)
  currentPage: number

  @Field(() => Int)
  limit: number
}

@ObjectType()
export class PaginatedComplaints {
  @Field(() => [Complaint])
  data: Complaint[]

  @Field(() => ComplaintMeta)
  meta: ComplaintMeta
}
