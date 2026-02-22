import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsInt } from 'class-validator'
import { SpecializationStatus } from '@/entities/Specialization'

export class CreateSpecializationDto {
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
  streamId: number

  @IsEnum(SpecializationStatus)
  @IsOptional()
  status?: SpecializationStatus
}

export class UpdateSpecializationDto {
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
  streamId?: number

  @IsEnum(SpecializationStatus)
  @IsOptional()
  status?: SpecializationStatus
}
