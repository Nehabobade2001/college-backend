import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateCenterDto {
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
  @MinLength(6)
  password?: string

  @IsString()
  @IsOptional()
  @MinLength(6)
  confirmPassword?: string

  @IsString()
  @IsOptional()
  notes?: string

  // Franchise fields
  @IsString()
  @IsOptional()
  franchiseName?: string

  @IsString()
  @IsOptional()
  ownerName?: string

  @IsString()
  @IsOptional()
  contactNumber?: string

  @IsString()
  @IsOptional()
  alternateNumber?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  state?: string

  @IsString()
  @IsOptional()
  pincode?: string

  @IsString()
  @IsOptional()
  registrationNumber?: string

  @IsString()
  @IsOptional()
  gstNumber?: string

  @IsString()
  @IsOptional()
  agreementStartDate?: string

  @IsString()
  @IsOptional()
  agreementEndDate?: string
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

  @IsString()
  @IsOptional()
  franchiseName?: string

  @IsString()
  @IsOptional()
  ownerName?: string

  @IsString()
  @IsOptional()
  contactNumber?: string

  @IsString()
  @IsOptional()
  alternateNumber?: string

  @IsString()
  @IsOptional()
  city?: string

  @IsString()
  @IsOptional()
  state?: string

  @IsString()
  @IsOptional()
  pincode?: string

  @IsString()
  @IsOptional()
  registrationNumber?: string

  @IsString()
  @IsOptional()
  gstNumber?: string

  @IsString()
  @IsOptional()
  agreementStartDate?: string

  @IsString()
  @IsOptional()
  agreementEndDate?: string

  @IsOptional()
  isActive?: boolean
}
