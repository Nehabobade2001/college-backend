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

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  UPI = 'upi',
  NETBANKING = 'netbanking',
  CHEQUE = 'cheque',
  OTHER = 'other',
}

@Entity('fee_payments')
export class FeePayment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  studentFeeId: number

  @ManyToOne(() => StudentFee, (studentFee) => studentFee.payments)
  @JoinColumn({ name: 'studentFeeId' })
  studentFee: StudentFee

  @Column({ type: 'int' })
  studentId: number

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number

  @Column({ type: 'date' })
  paymentDate: Date

  @Column({ type: 'enum', enum: PaymentMethod, default: PaymentMethod.CASH })
  paymentMethod: PaymentMethod

  @Column({ type: 'varchar', length: 255, nullable: true })
  transactionId: string

  @Column({ type: 'varchar', length: 100, unique: true })
  receiptNumber: string

  @Column({ type: 'text', nullable: true })
  remarks: string

  @Column({ type: 'int', nullable: true })
  collectedBy: number

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
