import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { Program } from './Program'
import { Subject } from './Subject'

export enum CourseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
}

export enum DurationType {
  MONTHS = 'months',
  YEARS = 'years',
  WEEKS = 'weeks',
}

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string | undefined

  @Column({ type: 'varchar', length: 100, unique: true })
  code!: string

  @Column({ type: 'text', nullable: true })
  description!: string

  @Column({ type: 'int' })
  programId!: number

  @ManyToOne(() => Program, { nullable: false })
  @JoinColumn({ name: 'programId' })
  program: Program

  @ManyToMany(() => Subject)
  @JoinTable({
    name: 'course_subjects',
    joinColumn: { name: 'courseId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'subjectId', referencedColumnName: 'id' },
  })
  subjects: Subject[]

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  fees: number

  @Column({ type: 'int' })
  duration: number

  @Column({ type: 'enum', enum: DurationType, default: DurationType.MONTHS })
  durationType: DurationType

  @Column({ type: 'text', nullable: true })
  eligibility: string

  @Column({ type: 'int', nullable: true })
  totalSeats: number

  @Column({ type: 'int', nullable: true })
  availableSeats: number

  @Column({ type: 'date', nullable: true })
  startDate: Date

  @Column({ type: 'date', nullable: true })
  endDate: Date

  @Column({ type: 'enum', enum: CourseStatus, default: CourseStatus.ACTIVE })
  status: CourseStatus

  @Column({ type: 'int', nullable: true })
  organizationId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
