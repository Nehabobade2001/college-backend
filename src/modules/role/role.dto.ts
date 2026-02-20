import { Field, InputType, PartialType } from '@nestjs/graphql'
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { CustomStatus } from '@/common/const/CustomStatus'

@InputType()
export class CreateRoleDto {
  @Field()
  @IsString()
  name: string

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string

  @Field(() => [Number])
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({ allowInfinity: false, allowNaN: false }, { each: true })
  @IsNotEmpty({ each: true })
  permissionIds: number[]
}

@InputType()
export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  @Field()
  @IsNumber()
  id: number
}

@InputType()
export class RoleStatusDto {
  @Field(() => [Number])
  ids: number[]

  @Field(() => CustomStatus)
  status: CustomStatus
}
