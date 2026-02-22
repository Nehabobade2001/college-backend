import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsInt } from 'class-validator'
import { SubjectStatus, SubjectType } from '@/entities/Subject'

export class CreateSubjectDto {
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

  @IsEnum(SubjectType)
  @IsOptional()
  type?: SubjectType

  @IsInt()
  @IsOptional()
  credits?: number

  @IsInt()
  @IsOptional()
  maxMarks?: number

  @IsInt()
  @IsOptional()
  minMarks?: number

  @IsEnum(SubjectStatus)
  @IsOptional()
  status?: SubjectStatus
}

export class UpdateSubjectDto {
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

  @IsEnum(SubjectType)
  @IsOptional()
  type?: SubjectType

  @IsInt()
  @IsOptional()
  credits?: number

  @IsInt()
  @IsOptional()
  maxMarks?: number

  @IsInt()
  @IsOptional()
  minMarks?: number

  @IsEnum(SubjectStatus)
  @IsOptional()
  status?: SubjectStatus
}
