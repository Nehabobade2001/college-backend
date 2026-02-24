/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common'
import { FeesService } from './fees.service'
import {
  CreateFeeStructureDto,
  AssignFeeToStudentDto,
  RecordPaymentDto,
  CreateInstallmentsDto,
  FeeReportQueryDto,
} from './fees.dto'

@Controller('fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Post('structure')
  async createFeeStructure(@Body() dto: CreateFeeStructureDto) {
    return await this.feesService.createFeeStructure(dto)
  }

  @Post('assign')
  async assignFeeToStudent(@Body() dto: AssignFeeToStudentDto) {
    return await this.feesService.assignFeeToStudent(dto)
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
