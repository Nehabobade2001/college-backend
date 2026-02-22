import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Category } from './Category'
import { Program } from './Program'

export enum DepartmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 100, unique: true })
  code: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'int' })
  categoryId: number

  @ManyToOne(() => Category, (category) => category.departments)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @OneToMany(() => Program, (program) => program.department)
  programs: Program[]

  @Column({
    type: 'enum',
    enum: DepartmentStatus,
    default: DepartmentStatus.ACTIVE,
  })
  status: DepartmentStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
