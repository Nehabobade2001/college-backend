/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Query, UseGuards, Patch, Res } from '@nestjs/common'
import { Response } from 'express'
import { FeesService } from './fees.service'
import { ExportService } from './export.service'
import {
  CreateFeeStructureDto,
  AssignFeeToStudentDto,
  RecordPaymentDto,
  CreateInstallmentsDto,
  FeeReportQueryDto,
  SubmitFeePaymentDto,
  ApproveSubmissionDto,
} from './fees.dto'

@Controller('fees')
export class FeesController {
  constructor(
    private readonly feesService: FeesService,
    private readonly exportService: ExportService,
  ) {}

  @Post('structure')
  async createFeeStructure(@Body() dto: CreateFeeStructureDto) {
    return await this.feesService.createFeeStructure(dto)
  }

  @Post('assign')
  async assignFeeToStudent(@Body() dto: AssignFeeToStudentDto) {
    return await this.feesService.assignFeeToStudent(dto)
  }

  @Post('submit')
  async submitFeePayment(@Body() dto: SubmitFeePaymentDto) {
    return await this.feesService.submitFeePayment(dto)
  }

  @Post('approve')
  async approveSubmission(@Body() dto: ApproveSubmissionDto) {
    return await this.feesService.approveSubmission(dto)
  }

  @Patch('reject/:submissionId')
  async rejectSubmission(
    @Param('submissionId') submissionId: number,
    @Body('rejectedBy') rejectedBy: number,
    @Body('reason') reason: string,
  ) {
    return await this.feesService.rejectSubmission(submissionId, rejectedBy, reason)
  }

  @Get('submissions/pending')
  async getPendingSubmissions(@Query('centerId') centerId?: number) {
    return await this.feesService.getPendingSubmissions(centerId)
  }

  @Post('payment')
  async recordPayment(@Body() dto: RecordPaymentDto) {
    return await this.feesService.recordPayment(dto)
  }

  @Post('installments')
  async createInstallments(@Body() dto: CreateInstallmentsDto) {
    return await this.feesService.createInstallments(dto)
  }

  @Get('student/:studentId')
  async getStudentFees(@Param('studentId') studentId: number) {
    return await this.feesService.getStudentFees(studentId)
  }

  @Get('pending')
  async getPendingFeesReport(@Query() query: FeeReportQueryDto) {
    return await this.feesService.getPendingFeesReport(query)
  }

  @Get('payments')
  async getAllPayments(@Query() query: FeeReportQueryDto) {
    return await this.feesService.getAllPayments(query)
  }

  @Get('export/payments/excel')
  async exportPaymentsToExcel(@Query() query: FeeReportQueryDto, @Res() res: Response) {
    const payments = await this.feesService.getAllPayments(query)
    const data = payments.map((p) => ({
      receiptNumber: p.receiptNumber,
      studentName: `${p.student?.firstName || ''} ${p.student?.lastName || ''}`.trim(),
      course: p.studentFee?.feeStructure?.course?.name || '-',
      amount: p.amount,
      paymentDate: p.paymentDate,
      paymentMethod: p.paymentMethod,
      status: 'Paid',
      center: p.centerId || '-',
    }))
    await this.exportService.exportToExcel(data, 'payments-report', res)
  }

  @Get('export/payments/pdf')
  async exportPaymentsToPDF(@Query() query: FeeReportQueryDto, @Res() res: Response) {
    const payments = await this.feesService.getAllPayments(query)
    const data = payments.map((p) => ({
      receiptNumber: p.receiptNumber,
      studentName: `${p.student?.firstName || ''} ${p.student?.lastName || ''}`.trim(),
      amount: p.amount,
      paymentDate: new Date(p.paymentDate).toLocaleDateString(),
      paymentMethod: p.paymentMethod,
      status: 'Paid',
    }))
    await this.exportService.exportToPDF(data, 'payments-report', res, 'Fee Payments Report')
  }

  @Get('export/pending/excel')
  async exportPendingFeesToExcel(@Query() query: FeeReportQueryDto, @Res() res: Response) {
    const pendingFees = await this.feesService.getPendingFeesReport(query)
    const data = pendingFees.map((f) => ({
      studentName: `${f.student?.firstName || ''} ${f.student?.lastName || ''}`.trim(),
      course: f.feeStructure?.course?.name || '-',
      totalAmount: f.totalAmount,
      paidAmount: f.paidAmount,
      pendingAmount: f.pendingAmount,
      dueDate: f.dueDate,
      status: f.status,
    }))
    await this.exportService.exportPendingFeesToExcel(data, res)
  }

  @Get('export/pending/pdf')
  async exportPendingFeesToPDF(@Query() query: FeeReportQueryDto, @Res() res: Response) {
    const pendingFees = await this.feesService.getPendingFeesReport(query)
    const data = pendingFees.map((f) => ({
      receiptNumber: '-',
      studentName: `${f.student?.firstName || ''} ${f.student?.lastName || ''}`.trim(),
      amount: f.pendingAmount,
      paymentDate: f.dueDate ? new Date(f.dueDate).toLocaleDateString() : '-',
      paymentMethod: '-',
      status: 'Pending',
    }))
    await this.exportService.exportToPDF(data, 'pending-fees-report', res, 'Pending Fees Report')
  }

  @Get('export/center/:centerId/excel')
  async exportCenterCollectionToExcel(
    @Param('centerId') centerId: number,
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
    @Res() res: Response,
  ) {
    const collection = await this.feesService.getCenterWiseCollection(centerId, fromDate, toDate)
    const data = collection.map((c) => ({
      paymentMethod: c.paymentMethod,
      totalPayments: c.totalPayments,
      totalCollection: `₹${c.totalCollection}`,
    }))
    await this.exportService.exportCenterCollectionToExcel(data, `Center ${centerId}`, res)
  }

  @Get('center/:centerId/collection')
  async getCenterWiseCollection(
    @Param('centerId') centerId: number,
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
  ) {
    return await this.feesService.getCenterWiseCollection(centerId, fromDate, toDate)
  }

  @Get('receipt/:receiptNumber')
  async getPaymentReceipt(@Param('receiptNumber') receiptNumber: string) {
    return await this.feesService.getPaymentReceipt(receiptNumber)
  }
}
