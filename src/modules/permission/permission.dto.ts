import { Permissions } from '@/entities/Permissions'
import {
  Field,
  InputType,
  ObjectType,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql'
import { IsInt, IsString } from 'class-validator'

export enum appName {
  'MasterApp',
  'TaskManagement',
  'MaterialManagement',
  'VehicleManagement',
}

registerEnumType(appName, {
  name: 'appName',
})

@InputType()
export class CreatePermissionDto {
  @Field(() => appName)
  appName: appName

  @Field()
  @IsString()
  action: string

  @Field()
  @IsString()
  module: string

  @Field()
  @IsString()
  description: string
}

@InputType()
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @Field()
  @IsInt()
  id: number
}

@ObjectType()
export class PermissionGroup {
  @Field(() => [Module])
  modules: Module[]
}

@ObjectType()
export class Module {
  @Field()
  name: string

  @Field(() => [Group])
  groups: Group[]
}

@ObjectType()
export class Group {
  @Field()
  name: string

  @Field(() => [Permissions])
  permissions: Permissions[]
}

@ObjectType()
export class PermissionDto {
  @Field()
  @IsInt()
  id: number

  @Field()
  module: string

  @Field()
  action: string

  @Field()
  description: string

  @Field()
  slug: string
}

@ObjectType()
export class PermissionGroupDto {
  @Field()
  name: string

  @Field(() => [PermissionDto])
  permissions: PermissionDto[]
}

@ObjectType()
export class AppPermissionsDto {
  @Field()
  appName: string

  @Field(() => [PermissionGroupDto]) // Change from Record<string, PermissionGroupDto> to an array
  modules: PermissionGroupDto[]
}

@ObjectType()
export class DynamicPermissionsDto {
  @Field(() => [AppPermissionsDto])
  apps: AppPermissionsDto[]
}
