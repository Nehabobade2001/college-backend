import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { ReportService } from './report.service'
import { ReportFilterDto } from './report.dto'

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('admissions')
  async getAdmissionReport(@Query() filter: ReportFilterDto) {
    return await this.reportService.getAdmissionReport(filter)
  }

  @Get('revenue')
  async getRevenueReport(@Query() filter: ReportFilterDto) {
    return await this.reportService.getRevenueReport(filter)
  }

  @Get('course-popularity')
  async getCoursePopularity(@Query() filter: ReportFilterDto) {
    return await this.reportService.getCoursePopularity(filter)
  }

  @Get('student-performance')
  async getStudentPerformance(@Query() filter: ReportFilterDto) {
    return await this.reportService.getStudentPerformance(filter)
  }

  @Get('fees-collection')
  async getFeesCollection(@Query() filter: ReportFilterDto) {
    return await this.reportService.getFeesCollection(filter)
  }

  @Get('result-summary')
  async getResultSummary(@Query() filter: ReportFilterDto) {
    return await this.reportService.getResultSummary(filter)
  }

  @Get('dashboard')
  async getDashboardStats(@Query() filter: ReportFilterDto) {
    return await this.reportService.getDashboardStats(filter)
  }
}
