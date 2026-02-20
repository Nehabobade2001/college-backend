import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@ObjectType()
@Entity('about')
export class About {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column({ type: 'varchar' })
  title: string

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description: string

  @Field({ nullable: true })
  @Column({ type: 'varchar', nullable: true })
  imageUrl: string

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  content: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
