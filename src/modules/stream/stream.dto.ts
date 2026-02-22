import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsInt } from 'class-validator'
import { StreamStatus } from '@/entities/Stream'

export class CreateStreamDto {
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

  @IsEnum(StreamStatus)
  @IsOptional()
  status?: StreamStatus
}

export class UpdateStreamDto {
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

  @IsEnum(StreamStatus)
  @IsOptional()
  status?: StreamStatus
}
