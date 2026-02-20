import { WithPagination } from '@/common/paginationDto/withPagination'
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import {
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm'
import { Package } from './Package'
import { createSmartUnion } from '@/common/helpers/helper'

@ObjectType()
@Entity('modules')
@Directive('@key(fields: "id")')
export class ApplicationModule {
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
  status: string

  @ManyToMany(() => Package, (appPackage) => appPackage.modules, {
    onDelete: 'CASCADE',
  })
  packages: Package[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}

@ObjectType()
export class PaginatedApplicationModules extends WithPagination {
  @Field(() => [ApplicationModule])
  data: ApplicationModule[]
}

// export key of module as a type
export type ApplicationModuleKey = keyof ApplicationModule

@ObjectType()
export class ApplicationModuleArray {
  @Field(() => [ApplicationModule])
  data: ApplicationModule[]
}

export const ApplicationModuleUnion = createSmartUnion(
  'ApplicationModuleUnion',
  () => ApplicationModule,
  () => ApplicationModuleArray,
  'data',
)
