import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { StudentFee } from './StudentFee'

export enum InstallmentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  OVERDUE = 'overdue',
}

@Entity('fee_installments')
export class FeeInstallment {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  studentFeeId: number

  @ManyToOne(() => StudentFee, (studentFee) => studentFee.installments)
  @JoinColumn({ name: 'studentFeeId' })
  studentFee: StudentFee

  @Column({ type: 'int' })
  installmentNumber: number

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  paidAmount: number

  @Column({ type: 'date' })
  dueDate: Date

  @Column({ type: 'varchar', length: 50, default: InstallmentStatus.PENDING })
  status: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
