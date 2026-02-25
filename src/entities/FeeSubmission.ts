import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { StudentFee } from './StudentFee'
import { Student } from './Student'

export enum SubmissionType {
  STUDENT = 'student',
  ADMIN = 'admin',
  CENTER = 'center',
}

@Entity('fee_submissions')
export class FeeSubmission {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  studentFeeId: number

  @ManyToOne(() => StudentFee)
  @JoinColumn({ name: 'studentFeeId' })
  studentFee: StudentFee

  @Column({ type: 'int' })
  studentId: number

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number

  @Column({ type: 'varchar', length: 50 })
  submissionType: string

  @Column({ type: 'int', nullable: true })
  submittedBy: number

  @Column({ type: 'varchar', length: 255, nullable: true })
  submittedByName: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  paymentProofUrl: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  screenshotUrl: string

  @Column({ type: 'varchar', length: 50, default: 'pending' })
  status: string

  @Column({ type: 'text', nullable: true })
  remarks: string

  @Column({ type: 'int', nullable: true })
  approvedBy: number

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date

  @Column({ type: 'int', nullable: true })
  paymentId: number

  @Column({ type: 'int', nullable: true })
  centerId: number

  @Column({ type: 'int', nullable: true })
  organizationId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
