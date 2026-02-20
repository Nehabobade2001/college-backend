import { WithPagination } from '@/common/paginationDto/withPagination'
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Project } from './Project'
import { User } from './User'
import { Role } from './Role'
import { createSmartUnion } from '@/common/helpers/helper'

@ObjectType()
@Entity('organizations')
@Directive('@key(fields: "id")')
export class Organization {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string

  @Field()
  @Column({ type: 'varchar' })
  status: 'active' | 'inactive' | 'blocked' | 'pending'

  @OneToMany(() => User, (user) => user.organization)
  users: User[]

  @OneToMany(() => Role, (role) => role.organization)
  roles: Role[]

  @OneToMany(() => Project, (project) => project.organization)
  projects: Project[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date | null
}

@ObjectType()
export class PaginatedOrganizations extends WithPagination {
  @Field(() => [Organization])
  data: Organization[]
}

export type OrganizationKey = keyof Organization

@ObjectType()
export class OrganizationArray {
  @Field(() => [Organization])
  data: Organization[]
}

export const OrganizationUnion = createSmartUnion(
  'OrganizationUnion',
  () => Organization,
  () => OrganizationArray,
  'data',
)
