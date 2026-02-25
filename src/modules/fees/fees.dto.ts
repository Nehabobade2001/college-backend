/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString, IsEnum, IsOptional, IsDate, Min, IsUrl } from 'class-validator'
import { Type } from 'class-transformer'

export enum FeeType {
  SEMESTER = 'semester',
  YEARLY = 'yearly',
  ONE_TIME = 'one_time',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  UPI = 'upi',
  NETBANKING = 'netbanking',
  CHEQUE = 'cheque',
  OTHER = 'other',
}

export enum SubmissionType {
  STUDENT = 'student',
  ADMIN = 'admin',
  CENTER = 'center',
}

export class CreateFeeStructureDto {
  @IsNumber()
  @IsNotEmpty()
  courseId: number

  @IsString()
  @IsNotEmpty()
  academicYear: string

  @IsNumber()
  @IsOptional()
  semester?: number

  @IsNumber()
  @IsOptional()
  year?: number

  @IsEnum(FeeType)
  @IsNotEmpty()
  feeType: FeeType

  @IsNumber()
  @Min(0)
  totalAmount: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  tuitionFee?: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  admissionFee?: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  examFee?: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  libraryFee?: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  labFee?: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  otherFee?: number

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dueDate?: Date

  @IsNumber()
  @IsOptional()
  lateFeeAmount?: number

  @IsNumber()
  @IsOptional()
  lateFeeApplicableAfter?: number
}

export class AssignFeeToStudentDto {
  @IsNumber()
  @IsNotEmpty()
  studentId: number

  @IsNumber()
  @IsNotEmpty()
  feeStructureId: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  discountAmount?: number

  @IsString()
  @IsOptional()
  discountReason?: string

  @IsNumber()
  @IsOptional()
  centerId?: number
}

export class RecordPaymentDto {
  @IsNumber()
  @IsNotEmpty()
  studentFeeId: number

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  paymentDate: Date

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod

  @IsString()
  @IsOptional()
  transactionId?: string

  @IsString()
  @IsOptional()
  remarks?: string

  @IsNumber()
  @IsOptional()
  collectedBy?: number

  @IsNumber()
  @IsOptional()
  centerId?: number
}

export class SubmitFeePaymentDto {
  @IsNumber()
  @IsNotEmpty()
  studentFeeId: number

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amount: number

  @IsEnum(SubmissionType)
  @IsNotEmpty()
  submissionType: SubmissionType

  @IsNumber()
  @IsOptional()
  submittedBy?: number

  @IsString()
  @IsOptional()
  submittedByName?: string

  @IsString()
  @IsOptional()
  paymentProofUrl?: string

  @IsString()
  @IsOptional()
  screenshotUrl?: string

  @IsString()
  @IsOptional()
  remarks?: string

  @IsNumber()
  @IsOptional()
  centerId?: number
}

export class ApproveSubmissionDto {
  @IsNumber()
  @IsNotEmpty()
  submissionId: number

  @IsNumber()
  @IsNotEmpty()
  approvedBy: number

  @IsEnum(PaymentMethod)
  @IsNotEmpty()
  paymentMethod: PaymentMethod

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  paymentDate: Date

  @IsString()
  @IsOptional()
  transactionId?: string

  @IsString()
  @IsOptional()
  remarks?: string
}

export class CreateInstallmentsDto {
  @IsNumber()
  @IsNotEmpty()
  studentFeeId: number

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  numberOfInstallments: number

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  firstDueDate: Date

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  intervalDays: number
}

export class FeeReportQueryDto {
  @IsNumber()
  @IsOptional()
  centerId?: number

  @IsString()
  @IsOptional()
  academicYear?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  fromDate?: Date

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  toDate?: Date
}
