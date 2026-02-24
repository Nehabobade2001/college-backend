import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  IsNumber,
  IsArray,
  IsDate,
  IsBoolean,
  ValidateNested,
  Min,
  Max,
} from 'class-validator'
import { Type } from 'class-transformer'
import { ResultStatus, ResultType } from '@/entities/Result'

export class SubjectMarkDto {
  @IsInt()
  @IsNotEmpty()
  subjectId!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  maxMarks!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  obtainedMarks!: number

  @IsString()
  @IsNotEmpty()
  grade!: string

  @IsBoolean()
  @IsOptional()
  isPassed?: boolean
}

export class CreateResultDto {
  @IsInt()
  @IsNotEmpty()
  studentId!: number

  @IsInt()
  @IsNotEmpty()
  courseId!: number

  @IsString()
  @IsNotEmpty()
  examName!: string

  @IsString()
  @IsNotEmpty()
  semester!: string

  @IsString()
  @IsNotEmpty()
  academicYear!: string

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  examDate!: Date

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectMarkDto)
  subjects!: SubjectMarkDto[]

  @IsEnum(ResultType)
  @IsOptional()
  resultType?: ResultType

  @IsString()
  @IsOptional()
  remarks?: string
}

export class UpdateResultDto {
  @IsString()
  @IsOptional()
  examName?: string

  @IsString()
  @IsOptional()
  semester?: string

  @IsString()
  @IsOptional()
  academicYear?: string

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  examDate?: Date

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectMarkDto)
  @IsOptional()
  subjects?: SubjectMarkDto[]

  @IsEnum(ResultType)
  @IsOptional()
  resultType?: ResultType

  @IsString()
  @IsOptional()
  remarks?: string
}

export class PublishResultDto {
  @IsBoolean()
  @IsNotEmpty()
  isPublished!: boolean
}

export class BulkUploadResultDto {
  @IsInt()
  @IsNotEmpty()
  courseId!: number

  @IsString()
  @IsNotEmpty()
  examName!: string

  @IsString()
  @IsNotEmpty()
  semester!: string

  @IsString()
  @IsNotEmpty()
  academicYear!: string
}
