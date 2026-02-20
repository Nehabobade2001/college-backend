import { Directive, Field, InputType, Int, ObjectType } from '@nestjs/graphql'
import { IsInt, IsObject, IsOptional, IsString } from 'class-validator'
import GraphQLJSON from 'graphql-type-json'

@ObjectType()
class Meta {
  @Field(() => Int)
  @Directive('@shareable')
  totalItems: number

  @Field(() => Int)
  @Directive('@shareable')
  totalPages: number

  @Field(() => Int)
  @Directive('@shareable')
  currentPage: number

  @Field(() => Int)
  @Directive('@shareable')
  limit: number
}

@ObjectType()
export class WithPagination {
  @Field(() => Meta)
  @Directive('@shareable')
  meta: Meta
}

@InputType()
export class ListInputDTO {
  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  page?: number

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  limit?: number

  @Field(() => [[String]], { nullable: true })
  @IsOptional()
  sortBy?: [string, string][]

  @IsOptional()
  searchBy?: string[]

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  search?: string

  @Field(() => GraphQLJSON, { nullable: true })
  @IsOptional()
  @IsObject()
  filter?: {
    [column: string]: string | string[]
  }

  @IsOptional()
  select?: string[]

  @IsOptional()
  @IsString()
  cursor?: string

  @IsOptional()
  @IsString()
  cursorColumn?: string

  @IsOptional()
  @IsString()
  cursorDirection?: 'before' | 'after'

  @IsString()
  path: string = ''
}
