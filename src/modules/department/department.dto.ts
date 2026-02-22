import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsInt } from 'class-validator'
import { DepartmentStatus } from '@/entities/Department'

export class CreateDepartmentDto {
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
  categoryId: number

  @IsEnum(DepartmentStatus)
  @IsOptional()
  status?: DepartmentStatus
}

export class UpdateDepartmentDto {
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
  categoryId?: number

  @IsEnum(DepartmentStatus)
  @IsOptional()
  status?: DepartmentStatus
}
