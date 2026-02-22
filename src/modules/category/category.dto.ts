import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength } from 'class-validator'
import { CategoryStatus } from '@/entities/Category'

export class CreateCategoryDto {
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

  @IsEnum(CategoryStatus)
  @IsOptional()
  status?: CategoryStatus
}

export class UpdateCategoryDto {
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

  @IsEnum(CategoryStatus)
  @IsOptional()
  status?: CategoryStatus
}
