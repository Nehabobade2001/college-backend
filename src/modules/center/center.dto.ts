import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateCenterDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  address?: string

  @IsNumber()
  @IsOptional()
  managerId?: number

  @IsString()
  @IsOptional()
  phone?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string

  @IsString()
  @IsOptional()
  @MinLength(6)
  confirmPassword?: string

  @IsString()
  @IsOptional()
  notes?: string
}

export class UpdateCenterDto {
  @IsNumber()
  @IsOptional()
  id?: number

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  address?: string

  @IsNumber()
  @IsOptional()
  managerId?: number

  @IsString()
  @IsOptional()
  phone?: string

  @IsEmail()
  @IsOptional()
  email?: string

  @IsString()
  @IsOptional()
  notes?: string

  @IsOptional()
  isActive?: boolean
}
