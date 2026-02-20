import { WithPagination } from '@/common/paginationDto/withPagination'
import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql'
import * as argon2 from 'argon2'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { generateFromEmail } from 'unique-username-generator'
import { Organization } from './Organization'
import { Role } from './Role'
import { UserRole } from './UserRole'
import { Project } from './Project'
import { Subscriptions } from './Subscription'
import { createSmartUnion } from '@/common/helpers/helper'

export enum UserType {
  admin = 'admin',
  adminEmployee = 'adminEmployee',
  organization = 'organization',
  organizationEmployee = 'organizationEmployee',
  thirdParty = 'thirdParty',
  thirdPartyEmployee = 'thirdPartyEmployee',
}

registerEnumType(UserType, {
  name: 'UserType',
  description: 'User Type Status',
})

export enum Designation {
  SUPER_ADMIN = 'SUPER_ADMIN',
  CEO = 'CEO',
  CTO = 'CTO',
  HR = 'HR',
  MANAGER = 'MANAGER',
  TEAM_LEAD = 'TEAM_LEAD',
  EMPLOYEE = 'EMPLOYEE',
}

registerEnumType(Designation, {
  name: 'Designation',
  description: 'User Designation Hierarchy',
})

@ObjectType() // GraphQL decorator
@Directive('@key(fields: "id")')
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ type: 'varchar' })
  name: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  username: string | null

  @Field({ nullable: true })
  @Column({ type: 'bigint' })
  mobileNo?: number

  @Field()
  @Column({ type: 'varchar' })
  email: string

  @Column({ type: 'varchar', length: 255, select: false })
  password: string

  @Field()
  @Column({ type: 'varchar' })
  status: 'active' | 'inactive' | 'blocked' | 'pending'

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, default: 'avatar' })
  avatar?: string | null

  @Field({ nullable: true })
  @Column({ type: 'int', nullable: true })
  parentId: number

  @Field({ nullable: true })
  @Column({ type: 'int' })
  organizationId: number

  //   @Field(() => Organization, { nullable: true })
  @ManyToOne(() => Organization, (organization) => organization.users)
  organization: Organization

  @OneToMany(() => Project, (project) => project.createdBy)
  project: Project

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[]

  @Column({ type: 'boolean', nullable: true, default: false })
  isPrimary: boolean

  @Field(() => UserType)
  @Column({ type: 'varchar' })
  userType: UserType

  @OneToMany(() => Subscriptions, (subscription) => subscription.user)
  subscriptions: Subscriptions[]

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date

  @Field(() => [Role], { nullable: true })
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId' },
    inverseJoinColumn: { name: 'roleId' },
  })
  roles: Role[]

  // Don't delete this field, it is used in the auth module
  permissions: any[] = []

  @Field(() => Designation, { nullable: true })
  @Column({ type: 'varchar' })
  designation: Designation

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.subordinates, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: User

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.parent)
  subordinates: User[]

  // create username if not exists
  @BeforeInsert()
  async createUsername() {
    if (!this.username) {
      const username = generateFromEmail(this.email, 3)
      this.username = username
    }
  }

  // Hash the password before inserting into the database
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await argon2.hash(this.password)
    }
  }

  // Method to compare passwords
  static validatePassword = async (password: string, hash: string) => {
    return await argon2.verify(hash, password)
  }
}

@Entity()
@Directive('@key(fields: "id")')
export class Otp {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ type: 'varchar' })
  email: string

  @Field()
  @Column({ type: 'bigint' })
  otp: number

  @Field()
  @Column({ type: 'varchar', default: 'login' })
  otpType:
    | 'login'
    | 'register'
    | 'reset-password'
    | 'verify-email'
    | 'forgot-password'
    | 'change-password'

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @Column({ type: 'timestamp' })
  expiresAt: Date

  @BeforeInsert()
  setExpiresAt() {
    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 5) // OTP expires in 5 minutes
    this.expiresAt = expiresAt
  }
}

@ObjectType()
export class LoginRes {
  @Field(() => User)
  user: User

  @Field(() => String)
  accessToken: string
}

@ObjectType()
export class RefreshRes extends LoginRes {
  @Field(() => String)
  refreshToken: string
}

@ObjectType()
export class OtpRes {
  @Field(() => Boolean)
  otpGeneratedSuccessfully: boolean

  @Field(() => Number, { nullable: true })
  otp: number | null

  @Field({ nullable: true })
  message: string | null
}

@ObjectType()
export class PaginatedUsers extends WithPagination {
  @Field(() => [User])
  data: User[]
}

// export key of user as a type
export type UserKey = keyof User

@ObjectType()
export class UserArray {
  @Field(() => [User])
  data: User[]
}

export const UserUnion = createSmartUnion(
  'UserUnion',
  () => User,
  () => UserArray,
  'data',
)
