import { Field, InputType } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

@InputType()
export class CreateAboutDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string

  @Field()
  @IsString()
  @IsOptional()
  description: string

  @Field()
  @IsString()
  @IsOptional()
  imageUrl?: string

  @Field()
  @IsString()
  @IsOptional()
  content?: string
}

@InputType()
export class UpdateAboutDto extends CreateAboutDto {
  @Field(() => Number)
  @IsInt()
  id: number
}
