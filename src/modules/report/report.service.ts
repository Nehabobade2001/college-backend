/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Student } from '@/entities/Student'
import { FeeSubmission } from '@/entities/FeeSubmission'
import { Result } from '@/entities/Result'
import { Course } from '@/entities/Course'
import { ReportFilterDto } from './report.dto'

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(FeeSubmission)
    private readonly feeSubmissionRepository: Repository<FeeSubmission>,
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async getAdmissionReport(filter: ReportFilterDto) {
    const query = this.studentRepository
      .createQueryBuilder('student')
      .select('DATE(student.admissionDate)', 'date')
      .addSelect('COUNT(student.id)', 'count')
      .groupBy('DATE(student.admissionDate)')
      .orderBy('date', 'DESC')

    if (filter.startDate) {
      query.andWhere('student.admissionDate >= :startDate', { startDate: filter.startDate })
    }
    if (filter.endDate) {
      query.andWhere('student.admissionDate <= :endDate', { endDate: filter.endDate })
    }
    if (filter.centerId) {
      query.andWhere('student.centerId = :centerId', { centerId: filter.centerId })
    }

    const data = await query.getRawMany()
    const total = await this.studentRepository.count()

    return { data, total, summary: { totalAdmissions: total } }
  }

  async getRevenueReport(filter: ReportFilterDto) {
    const query = this.feeSubmissionRepository
      .createQueryBuilder('fee')
      .select('DATE(fee.paymentDate)', 'date')
      .addSelect('SUM(fee.amountPaid)', 'revenue')
      .addSelect('COUNT(fee.id)', 'transactions')
      .where('fee.status = :status', { status: 'paid' })
      .groupBy('DATE(fee.paymentDate)')
      .orderBy('date', 'DESC')

    if (filter.startDate) {
      query.andWhere('fee.paymentDate >= :startDate', { startDate: filter.startDate })
    }
    if (filter.endDate) {
      query.andWhere('fee.paymentDate <= :endDate', { endDate: filter.endDate })
    }

    const data = await query.getRawMany()
    const totalRevenue = data.reduce((sum, item) => sum + parseFloat(item.revenue || 0), 0)

    return { data, summary: { totalRevenue, totalTransactions: data.length } }
  }

  async getCoursePopularity(filter: ReportFilterDto) {
    const query = this.studentRepository
      .createQueryBuilder('student')
      .leftJoin('student.course', 'course')
      .select('course.name', 'courseName')
      .addSelect('course.id', 'courseId')
      .addSelect('COUNT(student.id)', 'studentCount')
      .groupBy('course.id')
      .orderBy('studentCount', 'DESC')

    if (filter.centerId) {
      query.andWhere('student.centerId = :centerId', { centerId: filter.centerId })
    }

    const data = await query.getRawMany()
    return { data, summary: { totalCourses: data.length } }
  }

  async getStudentPerformance(filter: ReportFilterDto) {
    const query = this.resultRepository
      .createQueryBuilder('result')
      .leftJoin('result.student', 'student')
      .select('student.id', 'studentId')
      .addSelect('student.firstName', 'firstName')
      .addSelect('student.lastName', 'lastName')
      .addSelect('AVG(result.percentage)', 'avgPercentage')
      .addSelect('COUNT(result.id)', 'totalExams')
      .groupBy('student.id')
      .orderBy('avgPercentage', 'DESC')

    if (filter.courseId) {
      query.andWhere('result.courseId = :courseId', { courseId: filter.courseId })
    }
    if (filter.centerId) {
      query.andWhere('student.centerId = :centerId', { centerId: filter.centerId })
    }

    const data = await query.getRawMany()
    return { data, summary: { totalStudents: data.length } }
  }

  async getFeesCollection(filter: ReportFilterDto) {
    const query = this.feeSubmissionRepository
      .createQueryBuilder('fee')
      .select('fee.status', 'status')
      .addSelect('COUNT(fee.id)', 'count')
      .addSelect('SUM(fee.amountPaid)', 'totalAmount')
      .groupBy('fee.status')

    if (filter.startDate) {
      query.andWhere('fee.paymentDate >= :startDate', { startDate: filter.startDate })
    }
    if (filter.endDate) {
      query.andWhere('fee.paymentDate <= :endDate', { endDate: filter.endDate })
    }

    const data = await query.getRawMany()
    const totalCollected = data
      .filter((item) => item.status === 'paid')
      .reduce((sum, item) => sum + parseFloat(item.totalAmount || 0), 0)

    return { data, summary: { totalCollected } }
  }

  async getResultSummary(filter: ReportFilterDto) {
    const query = this.resultRepository
      .createQueryBuilder('result')
      .select('result.grade', 'grade')
      .addSelect('COUNT(result.id)', 'count')
      .addSelect('AVG(result.percentage)', 'avgPercentage')
      .groupBy('result.grade')
      .orderBy('avgPercentage', 'DESC')

    if (filter.courseId) {
      query.andWhere('result.courseId = :courseId', { courseId: filter.courseId })
    }
    if (filter.startDate) {
      query.andWhere('result.examDate >= :startDate', { startDate: filter.startDate })
    }
    if (filter.endDate) {
      query.andWhere('result.examDate <= :endDate', { endDate: filter.endDate })
    }

    const data = await query.getRawMany()
    const totalResults = data.reduce((sum, item) => sum + parseInt(item.count || 0), 0)

    return { data, summary: { totalResults } }
  }

  async getDashboardStats(filter: ReportFilterDto) {
    const [totalStudents, totalRevenue, totalCourses, avgPerformance] = await Promise.all([
      this.studentRepository.count(),
      this.feeSubmissionRepository
        .createQueryBuilder('fee')
        .select('SUM(fee.amountPaid)', 'total')
        .where('fee.status = :status', { status: 'paid' })
        .getRawOne(),
      this.courseRepository.count(),
      this.resultRepository
        .createQueryBuilder('result')
        .select('AVG(result.percentage)', 'avg')
        .getRawOne(),
    ])

    return {
      totalStudents,
      totalRevenue: parseFloat(totalRevenue?.total || 0),
      totalCourses,
      avgPerformance: parseFloat(avgPerformance?.avg || 0),
    }
  }
}
