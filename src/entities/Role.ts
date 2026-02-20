import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Permissions } from './Permissions'
import { User } from './User'
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { WithPagination } from '@/common/paginationDto/withPagination'
import { RolePermissions } from './RolePermissions'
import { UserRole } from './UserRole'
import { Organization } from './Organization'
import { createSmartUnion } from '@/common/helpers/helper'

@Entity('roles')
@ObjectType()
@Directive('@key(fields: "id")')
export class Role {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'int' })
  organizationId: number

  @ManyToMany(() => User, (user) => user.roles)
  users: User[]

  @Field(() => [Permissions])
  @ManyToMany(() => Permissions, (permissions) => permissions.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'roleId' },
    inverseJoinColumn: { name: 'permissionId' },
  })
  permissions: Permissions[]

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  roleType: string

  @Column({ type: 'boolean', nullable: true, default: false })
  isPrimary: boolean

  @Field()
  @Column({ type: 'varchar' })
  status: 'active' | 'inactive' | 'blocked' | 'pending'

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date | null

  @Field()
  permissionCount: number

  @OneToMany(() => RolePermissions, (rp) => rp.role)
  rolePermissions: RolePermissions

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[]

  @Field(() => Organization, { nullable: true })
  @ManyToOne(() => Organization, (organization) => organization.roles)
  organization: Organization
}

@ObjectType()
export class PaginatedRoles extends WithPagination {
  @Field(() => [Role])
  data: Role[]
}

// export key of user as a type
export type RoleKey = keyof Role

@ObjectType()
export class RoleArray {
  @Field(() => [Role])
  data: Role[]
}

export const RoleUnion = createSmartUnion(
  'RoleUnion',
  () => Role,
  () => RoleArray,
  'data',
)
