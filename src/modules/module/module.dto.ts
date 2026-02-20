import { Field, InputType } from '@nestjs/graphql'
import { IsInt, IsOptional, IsString } from 'class-validator'
import { CustomStatus } from '@/common/const/CustomStatus'

@InputType()
export class CreateModuleDto {
  @Field()
  @IsString()
  name: string

  @Field()
  @IsOptional()
  description?: string
}

@InputType()
export class UpdateModuleDto extends CreateModuleDto {
  @Field(() => Number)
  @IsInt()
  id: number
}

@InputType()
export class ModuleStatusDto {
  @Field(() => [Number])
  ids: number

  @Field(() => CustomStatus)
  status: CustomStatus
}
