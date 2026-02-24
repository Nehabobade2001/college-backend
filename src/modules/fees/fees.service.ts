/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Between, IsNull, LessThanOrEqual } from 'typeorm'
import { FeeStructure } from '@/entities/FeeStructure'
import { StudentFee } from '@/entities/StudentFee'
import { FeePayment } from '@/entities/FeePayment'
import { FeeInstallment } from '@/entities/FeeInstallment'
import {
  CreateFeeStructureDto,
  AssignFeeToStudentDto,
  RecordPaymentDto,
  CreateInstallmentsDto,
  FeeReportQueryDto,
} from './fees.dto'

@Injectable()
export class FeesService {
  constructor(
    @InjectRepository(FeeStructure)
    private readonly feeStructureRepo: Repository<FeeStructure>,
    @InjectRepository(StudentFee)
    private readonly studentFeeRepo: Repository<StudentFee>,
    @InjectRepository(FeePayment)
    private readonly feePaymentRepo: Repository<FeePayment>,
    @InjectRepository(FeeInstallment)
    private readonly feeInstallmentRepo: Repository<FeeInstallment>,
  ) {}

  async createFeeStructure(dto: CreateFeeStructureDto): Promise<FeeStructure> {
    const feeStructure = this.feeStructureRepo.create(dto)
    return await this.feeStructureRepo.save(feeStructure)
  }

  async assignFeeToStudent(dto: AssignFeeToStudentDto): Promise<StudentFee> {
    const feeStructure = await this.feeStructureRepo.findOne({
      where: { id: dto.feeStructureId },
    })

    if (!feeStructure) {
      throw new NotFoundException('Fee structure not found')
    }

    const totalAmount = feeStructure.totalAmount - (dto.discountAmount || 0)
    const studentFee = this.studentFeeRepo.create({
      studentId: dto.studentId,
      feeStructureId: dto.feeStructureId,
      totalAmount,
      pendingAmount: totalAmount,
      discountAmount: dto.discountAmount || 0,
      discountReason: dto.discountReason,
      dueDate: feeStructure.dueDate,
      centerId: dto.centerId,
      status: 'pending',
    })

    return await this.studentFeeRepo.save(studentFee)
  }

  async recordPayment(dto: RecordPaymentDto): Promise<FeePayment> {
    const studentFee = await this.studentFeeRepo.findOne({
      where: { id: dto.studentFeeId },
      relations: ['student'],
    })

    if (!studentFee) {
      throw new NotFoundException('Student fee record not found')
    }

    if (dto.amount > studentFee.pendingAmount) {
      throw new BadRequestException('Payment amount exceeds pending amount')
    }

    const receiptNumber = await this.generateReceiptNumber()

    const payment = this.feePaymentRepo.create({
      ...dto,
      studentId: studentFee.studentId,
      receiptNumber,
    })

    await this.feePaymentRepo.save(payment)

    studentFee.paidAmount += dto.amount
    studentFee.pendingAmount -= dto.amount
    studentFee.status = studentFee.pendingAmount === 0 ? 'paid' : 'partial'

    await this.studentFeeRepo.save(studentFee)

    return payment
  }

  async createInstallments(dto: CreateInstallmentsDto): Promise<FeeInstallment[]> {
    const studentFee = await this.studentFeeRepo.findOne({
      where: { id: dto.studentFeeId },
    })

    if (!studentFee) {
      throw new NotFoundException('Student fee record not found')
    }

    const installmentAmount = studentFee.totalAmount / dto.numberOfInstallments
    const installments: FeeInstallment[] = []

    for (let i = 0; i < dto.numberOfInstallments; i++) {
      const dueDate = new Date(dto.firstDueDate)
      dueDate.setDate(dueDate.getDate() + i * dto.intervalDays)

      const installment = this.feeInstallmentRepo.create({
        studentFeeId: dto.studentFeeId,
        installmentNumber: i + 1,
        amount: installmentAmount,
        dueDate,
        status: 'pending',
      })

      installments.push(installment)
    }

    return await this.feeInstallmentRepo.save(installments)
  }

  async getStudentFees(studentId: number) {
    return await this.studentFeeRepo.find({
      where: { studentId, deletedAt: IsNull() },
      relations: ['feeStructure', 'feeStructure.course', 'payments', 'installments'],
      order: { createdAt: 'DESC' },
    })
  }

  async getPendingFeesReport(query: FeeReportQueryDto) {
    const where: any = { status: 'pending', deletedAt: IsNull() }

    if (query.centerId) where.centerId = query.centerId
    if (query.fromDate && query.toDate) {
      where.dueDate = Between(query.fromDate, query.toDate)
    }

    return await this.studentFeeRepo.find({
      where,
      relations: ['student', 'feeStructure', 'feeStructure.course'],
      order: { dueDate: 'ASC' },
    })
  }

  async getCenterWiseCollection(centerId: number, fromDate: Date, toDate: Date) {
    return await this.feePaymentRepo
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'totalCollection')
      .addSelect('COUNT(payment.id)', 'totalPayments')
      .addSelect('payment.paymentMethod', 'paymentMethod')
      .where('payment.centerId = :centerId', { centerId })
      .andWhere('payment.paymentDate BETWEEN :fromDate AND :toDate', { fromDate, toDate })
      .groupBy('payment.paymentMethod')
      .getRawMany()
  }

  async getAllPayments(query: FeeReportQueryDto) {
    const where: any = { deletedAt: IsNull() }

    if (query.centerId) where.centerId = query.centerId
    if (query.fromDate && query.toDate) {
      where.paymentDate = Between(query.fromDate, query.toDate)
    }

    return await this.feePaymentRepo.find({
      where,
      relations: ['student', 'studentFee', 'studentFee.feeStructure'],
      order: { paymentDate: 'DESC' },
    })
  }

  async getPaymentReceipt(receiptNumber: string) {
    const payment = await this.feePaymentRepo.findOne({
      where: { receiptNumber },
      relations: ['student', 'studentFee', 'studentFee.feeStructure', 'studentFee.feeStructure.course'],
    })

    if (!payment) {
      throw new NotFoundException('Receipt not found')
    }

    return payment
  }

  private async generateReceiptNumber(): Promise<string> {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const count = await this.feePaymentRepo.count()
    return `RCP${year}${month}${String(count + 1).padStart(6, '0')}`
  }
}
