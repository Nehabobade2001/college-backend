/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeeStructure } from '@/entities/FeeStructure'
import { StudentFee } from '@/entities/StudentFee'
import { FeePayment } from '@/entities/FeePayment'
import { FeeInstallment } from '@/entities/FeeInstallment'
import { FeeSubmission } from '@/entities/FeeSubmission'
import { FeesController } from './fees.controller'
import { FeesService } from './fees.service'
import { ExportService } from './export.service'

@Module({
  imports: [TypeOrmModule.forFeature([FeeStructure, StudentFee, FeePayment, FeeInstallment, FeeSubmission])],
  controllers: [FeesController],
  providers: [FeesService, ExportService],
  exports: [FeesService],
})
export class FeesModule {}
