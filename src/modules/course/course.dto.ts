import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  MaxLength,
  IsInt,
  IsNumber,
  IsArray,
  IsDate,
  Min,
} from 'class-validator'
import { Type } from 'class-transformer'
import { CourseStatus, DurationType } from '@/entities/Course'

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code: string

  @IsString()
  @IsOptional()
  description?: string

  @IsInt()
  @IsNotEmpty()
  programId: number

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  subjectIds?: number[]

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  fees: number

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  duration: number

  @IsEnum(DurationType)
  @IsOptional()
  durationType?: DurationType

  @IsString()
  @IsOptional()
  eligibility?: string

  @IsInt()
  @IsOptional()
  @Min(0)
  totalSeats?: number

  @IsInt()
  @IsOptional()
  @Min(0)
  availableSeats?: number

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus
}

export class UpdateCourseDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string

  @IsString()
  @IsOptional()
  @MaxLength(100)
  code?: string

  @IsString()
  @IsOptional()
  description?: string

  @IsInt()
  @IsOptional()
  programId?: number

  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  subjectIds?: number[]

  @IsNumber()
  @IsOptional()
  @Min(0)
  fees?: number

  @IsInt()
  @IsOptional()
  @Min(1)
  duration?: number

  @IsEnum(DurationType)
  @IsOptional()
  durationType?: DurationType

  @IsString()
  @IsOptional()
  eligibility?: string

  @IsInt()
  @IsOptional()
  @Min(0)
  totalSeats?: number

  @IsInt()
  @IsOptional()
  @Min(0)
  availableSeats?: number

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date

  @IsEnum(CourseStatus)
  @IsOptional()
  status?: CourseStatus
}

export class AssignSubjectsDto {
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  subjectIds: number[]
}
