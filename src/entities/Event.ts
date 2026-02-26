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

export enum EventType {
  NOTICE = 'NOTICE',
  EVENT = 'EVENT',
  HOLIDAY = 'HOLIDAY',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

export enum EventPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

registerEnumType(EventType, { name: 'EventType' })
registerEnumType(EventPriority, { name: 'EventPriority' })
registerEnumType(EventStatus, { name: 'EventStatus' })

@ObjectType()
@Entity('events')
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('varchar', { length: 255 })
  title: string

  @Field()
  @Column('text')
  description: string

  @Field(() => EventType)
  @Column({ type: 'enum', enum: EventType, default: EventType.NOTICE })
  type: EventType

  @Field(() => EventPriority)
  @Column({ type: 'enum', enum: EventPriority, default: EventPriority.MEDIUM })
  priority: EventPriority

  @Field(() => EventStatus)
  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.DRAFT })
  status: EventStatus

  @Field()
  @Column({ type: 'date' })
  startDate: Date

  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  endDate: Date

  @Field(() => [Int], { nullable: true })
  @Column('simple-array', { nullable: true })
  centerIds: number[]

  @Field(() => [Int], { nullable: true })
  @Column('simple-array', { nullable: true })
  studentIds: number[]

  @Field({ nullable: true })
  @Column('varchar', { length: 500, nullable: true })
  attachmentUrl: string

  @Field(() => Int)
  @Column('int')
  createdBy: number

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, { nullable: true })
  creator: User

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date
}

@ObjectType()
class EventMeta {
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
export class PaginatedEvents {
  @Field(() => [Event])
  data: Event[]

  @Field(() => EventMeta)
  meta: EventMeta
}
