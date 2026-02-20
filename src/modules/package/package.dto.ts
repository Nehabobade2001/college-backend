import { DiscountType } from '@/entities/Coupon'
import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql'
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export enum PackageStatus {
  active = 'active',
  inactive = 'inactive',
  blocked = 'blocked',
  pending = 'pending',
}

registerEnumType(PackageStatus, {
  name: 'PackageStatus',
  description: 'Package Status',
})

@InputType()
export class CreatePackageDto {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsOptional()
  description?: string

  @Field()
  @IsNumber()
  price: number

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  discountedPrice: number

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  offerType?: DiscountType

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  offerExpiryDate?: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  offerDescription?: string

  @Field(() => [Int])
  @IsNotEmpty()
  moduleIds: number[]
}

@InputType()
export class UpdatePackageDto extends CreatePackageDto {
  @Field(() => Number)
  @IsInt()
  id: number
}

@InputType()
export class PackageStatusDto {
  @Field(() => [Number])
  ids: number[]

  @Field(() => PackageStatus)
  status: PackageStatus
}
