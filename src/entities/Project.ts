import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Organization } from './Organization';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('projects')
@ObjectType()
export class Project {
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
  @Column({ type: 'varchar' })
  status: 'active' | 'inactive' | 'blocked' | 'pending';

  @Column({ type: 'int' })
  organizationId: number;

  @Column({ type: 'int' })
  createdById: number;

  @Field(() => Organization)
  @ManyToOne(() => Organization, (organization) => organization.projects)
  organization: Organization;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.project)
  createdBy: User;

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
