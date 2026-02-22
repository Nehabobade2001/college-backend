import { IsString, IsNotEmpty, IsOptional, IsEnum, MaxLength, IsNumber } from 'class-validator'
import { AddressType } from '@/entities/Address'

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  addressLine1: string

  @IsString()
  @IsOptional()
  @MaxLength(255)
  addressLine2?: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  city: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  state: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  country: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  pincode: string

  @IsEnum(AddressType)
  @IsOptional()
  type?: AddressType

  @IsString()
  @IsOptional()
  @MaxLength(50)
  landmark?: string

  @IsNumber()
  @IsOptional()
  latitude?: number

  @IsNumber()
  @IsOptional()
  longitude?: number
}

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  addressLine1?: string

  @IsString()
  @IsOptional()
  @MaxLength(255)
  addressLine2?: string

  @IsString()
  @IsOptional()
  @MaxLength(100)
  city?: string

  @IsString()
  @IsOptional()
  @MaxLength(100)
  state?: string

  @IsString()
  @IsOptional()
  @MaxLength(100)
  country?: string

  @IsString()
  @IsOptional()
  @MaxLength(20)
  pincode?: string

  @IsEnum(AddressType)
  @IsOptional()
  type?: AddressType

  @IsString()
  @IsOptional()
  @MaxLength(50)
  landmark?: string

  @IsNumber()
  @IsOptional()
  latitude?: number

  @IsNumber()
  @IsOptional()
  longitude?: number
}
