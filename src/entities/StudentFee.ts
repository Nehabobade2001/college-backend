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
import { Student } from './Student'
import { FeeStructure } from './FeeStructure'
import { FeePayment } from './FeePayment'
import { FeeInstallment } from './FeeInstallment'

export enum StudentFeeStatus {
  PENDING = 'pending',
  PARTIAL = 'partial',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

@Entity('student_fees')
export class StudentFee {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  studentId: number

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student

  @Column({ type: 'int' })
  feeStructureId: number

  @ManyToOne(() => FeeStructure, (feeStructure) => feeStructure.studentFees)
  @JoinColumn({ name: 'feeStructureId' })
  feeStructure: FeeStructure

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  paidAmount: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pendingAmount: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  discountAmount: number

  @Column({ type: 'text', nullable: true })
  discountReason: string

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  lateFeeAmount: number

  @Column({ type: 'varchar', length: 50, default: StudentFeeStatus.PENDING })
  status: string

  @Column({ type: 'date', nullable: true })
  dueDate: Date

  @Column({ type: 'int', nullable: true })
  centerId: number

  @Column({ type: 'int', nullable: true })
  organizationId: number

  @OneToMany(() => FeePayment, (payment) => payment.studentFee)
  payments: FeePayment[]

  @OneToMany(() => FeeInstallment, (installment) => installment.studentFee)
  installments: FeeInstallment[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
