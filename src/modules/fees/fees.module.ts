/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FeeStructure } from '@/entities/FeeStructure'
import { StudentFee } from '@/entities/StudentFee'
import { FeePayment } from '@/entities/FeePayment'
import { FeeInstallment } from '@/entities/FeeInstallment'
import { FeesController } from './fees.controller'
import { FeesService } from './fees.service'

@Module({
  imports: [TypeOrmModule.forFeature([FeeStructure, StudentFee, FeePayment, FeeInstallment])],
  controllers: [FeesController],
  providers: [FeesService],
  exports: [FeesService],
})
export class FeesModule {}
