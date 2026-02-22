import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsInt } from 'class-validator'
import { ProgramStatus } from '@/entities/Program'

export class CreateProgramDto {
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
  @IsOptional()
  duration?: number

  @IsString()
  @IsOptional()
  durationType?: string

  @IsInt()
  @IsNotEmpty()
  departmentId: number

  @IsEnum(ProgramStatus)
  @IsOptional()
  status?: ProgramStatus
}

export class UpdateProgramDto {
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
  duration?: number

  @IsString()
  @IsOptional()
  durationType?: string

  @IsInt()
  @IsOptional()
  departmentId?: number

  @IsEnum(ProgramStatus)
  @IsOptional()
  status?: ProgramStatus
}
