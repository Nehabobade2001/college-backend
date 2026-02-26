import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Student } from '@/entities/Student'
import { FeeSubmission } from '@/entities/FeeSubmission'
import { Result } from '@/entities/Result'
import { Course } from '@/entities/Course'
import { ReportService } from './report.service'
import { ReportController } from './report.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Student, FeeSubmission, Result, Course])],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
