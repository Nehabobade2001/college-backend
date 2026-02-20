import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from './Role'
import { WithPagination } from '@/common/paginationDto/withPagination'

@ObjectType()
@Entity('permissions')
@Directive('@key(fields: "id")')
export class Permissions {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
  })
  appName: string

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
  })
  groupName: string

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
  })
  module: string

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
  })
  action: string

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
  })
  slug: string

  @Field()
  @Column({
    type: 'varchar',
    length: 255,
  })
  description: string

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date | null
}

@ObjectType()
export class PaginatedPermissions extends WithPagination {
  @Field(() => [Permissions])
  data: Permissions[]
}

// export key of module as a type
export type PermissionsKey = keyof Permissions
