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
import { Course } from './Course'
import { StudentFee } from './StudentFee'

export enum FeeType {
  SEMESTER = 'semester',
  YEARLY = 'yearly',
  ONE_TIME = 'one_time',
}

export enum FeeStructureStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('fee_structures')
export class FeeStructure {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  courseId: number

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course

  @Column({ type: 'varchar', length: 50 })
  academicYear: string

  @Column({ type: 'int', nullable: true })
  semester: number

  @Column({ type: 'int', nullable: true })
  year: number

  @Column({ type: 'enum', enum: FeeType, default: FeeType.SEMESTER })
  feeType: FeeType

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  tuitionFee: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  admissionFee: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  examFee: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  libraryFee: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  labFee: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  otherFee: number

  @Column({ type: 'date', nullable: true })
  dueDate: Date

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  lateFeeAmount: number

  @Column({ type: 'int', default: 0 })
  lateFeeApplicableAfter: number

  @Column({ type: 'enum', enum: FeeStructureStatus, default: FeeStructureStatus.ACTIVE })
  status: FeeStructureStatus

  @Column({ type: 'int', nullable: true })
  organizationId: number

  @OneToMany(() => StudentFee, (studentFee) => studentFee.feeStructure)
  studentFees: StudentFee[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
