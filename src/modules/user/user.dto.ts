import { ListInputDTO } from '@/common/paginationDto/withPagination'
import { Field, InputType, PartialType, Int } from '@nestjs/graphql'
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { CustomStatus } from '@/common/const/CustomStatus'
import { Designation, UserType } from '@/entities/User'

@InputType() // GraphQL decorator
export class CreateUserDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @Field()
  @IsNumber()
  @IsNotEmpty()
  mobileNo: number

  @Field(() => [Int])
  @IsNotEmpty()
  roleIds: number[]

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  avatar?: string

  @Field(() => UserType, { nullable: true })
  @IsEnum(UserType)
  @IsOptional()
  userType?: UserType

  @Field(() => Designation)
  @IsEnum(Designation)
  designation: Designation

  @Field({ nullable: true })
  @IsOptional()
  parentId?: number | null
}

@InputType()
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @Field(() => Int)
  @IsInt()
  id: number
}

@InputType()
export class UserListInputDTO extends PartialType(ListInputDTO) {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  parentId?: string
}

@InputType() // GraphQL decorator
export class ChangePasswordDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  currentPassword: string

  @Field()
  @IsString()
  @IsNotEmpty()
  newPassword: string

  @Field()
  @IsString()
  @IsNotEmpty()
  email: string
}

@InputType()
export class UserStatusDto {
  @Field(() => [Number])
  ids: number

  @Field(() => CustomStatus)
  status: CustomStatus
}
