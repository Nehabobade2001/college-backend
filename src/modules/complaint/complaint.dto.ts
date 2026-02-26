import { Field, InputType, Int } from '@nestjs/graphql'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { ComplaintPriority, ComplaintStatus } from '@/entities/Complaint'

@InputType()
export class CreateComplaintDto {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string

  @Field(() => ComplaintPriority, { defaultValue: ComplaintPriority.MEDIUM })
  @IsEnum(ComplaintPriority)
  @IsOptional()
  priority?: ComplaintPriority

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  studentId: number

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  centerId?: number
}

@InputType()
export class UpdateComplaintDto {
  @Field(() => Int)
  @IsInt()
  id: number

  @Field({ nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  title?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string

  @Field(() => ComplaintStatus, { nullable: true })
  @IsEnum(ComplaintStatus)
  @IsOptional()
  status?: ComplaintStatus

  @Field(() => ComplaintPriority, { nullable: true })
  @IsEnum(ComplaintPriority)
  @IsOptional()
  priority?: ComplaintPriority

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  centerId?: number

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  assignedTo?: number

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  resolution?: string
}

@InputType()
export class FilterComplaintDto {
  @Field(() => ComplaintStatus, { nullable: true })
  @IsEnum(ComplaintStatus)
  @IsOptional()
  status?: ComplaintStatus

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  studentId?: number

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  centerId?: number

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  assignedTo?: number
}
