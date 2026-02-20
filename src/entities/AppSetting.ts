import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity('app_settings')
@Directive('@key(fields: "id")')
export class AppSetting {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ type: 'varchar', default: 'App Title' })
  title: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, default: null })
  description: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, default: null })
  logo: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, default: null })
  favicon: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, default: null })
  coverImage: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, default: null })
  copyRight: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true, default: null })
  supportEmail: string

  @Field({ nullable: true })
  @Column({ type: 'bigint', nullable: true, default: null })
  supportPhone: number

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true, default: null })
  twoFactorAuth?: boolean

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true, default: null })
  otpSMS?: boolean

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true, default: null })
  otpEmail?: boolean

  @Field({ nullable: true })
  @Column({ type: 'boolean', nullable: true, default: null })
  captcha?: boolean

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date
}
