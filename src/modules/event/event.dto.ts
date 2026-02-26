import { Field, InputType, Int } from '@nestjs/graphql'
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { EventPriority, EventStatus, EventType } from '@/entities/Event'

@InputType()
export class CreateEventDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  title: string

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string

  @Field(() => EventType)
  @IsEnum(EventType)
  type: EventType

  @Field(() => EventPriority, { defaultValue: EventPriority.MEDIUM })
  @IsEnum(EventPriority)
  @IsOptional()
  priority?: EventPriority

  @Field(() => EventStatus, { defaultValue: EventStatus.DRAFT })
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus

  @Field()
  @IsDateString()
  startDate: Date

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  endDate?: Date

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  centerIds?: number[]

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  studentIds?: number[]

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  attachmentUrl?: string
}

@InputType()
export class UpdateEventDto {
  @Field(() => Int)
  @IsNumber()
  id: number

  @Field({ nullable: true })
  @IsString()
  @MaxLength(200)
  @IsOptional()
  title?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string

  @Field(() => EventType, { nullable: true })
  @IsEnum(EventType)
  @IsOptional()
  type?: EventType

  @Field(() => EventPriority, { nullable: true })
  @IsEnum(EventPriority)
  @IsOptional()
  priority?: EventPriority

  @Field(() => EventStatus, { nullable: true })
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  startDate?: Date

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  endDate?: Date

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  centerIds?: number[]

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  studentIds?: number[]

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  attachmentUrl?: string
}

@InputType()
export class FilterEventDto {
  @Field(() => EventType, { nullable: true })
  @IsEnum(EventType)
  @IsOptional()
  type?: EventType

  @Field(() => EventStatus, { nullable: true })
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  centerId?: number

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  studentId?: number

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  startDate?: Date

  @Field({ nullable: true })
  @IsDateString()
  @IsOptional()
  endDate?: Date
}
