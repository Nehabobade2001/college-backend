import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApplicationModule } from './Module';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { WithPagination } from '@/common/paginationDto/withPagination';
import { createSmartUnion } from '@/common/helpers/helper';

@Entity('packages')
@ObjectType()
export class Package {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Field()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Field()
  @Column({ type: 'varchar' })
  status: 'active' | 'inactive' | 'blocked' | 'pending';

  @Field(() => [ApplicationModule])
  @ManyToMany(() => ApplicationModule, (module) => module.packages)
  @JoinTable({
    name: 'package_modules',
    joinColumn: { name: 'packageId' },
    inverseJoinColumn: { name: 'moduleId' },
  })
  modules: ApplicationModule[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  @Field({ nullable: true })
  @DeleteDateColumn()
  deletedAt: Date;
}

@ObjectType()
export class PaginatedPackages extends WithPagination {
  @Field(() => [Package])
  data: Package[];
}

export type PackageKey = keyof Package;

@ObjectType()
export class PackageArray {
  @Field(() => [Package])
  data: Package[];
}

export const PackageUnion = createSmartUnion(
  'PackageUnion',
  () => Package,
  () => PackageArray,
  'data',
);
