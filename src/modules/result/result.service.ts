/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'
import { Result, ResultSubject, ResultStatus } from '@/entities/Result'
import { Student } from '@/entities/Student'
import { Course } from '@/entities/Course'
import { CreateResultDto, UpdateResultDto, PublishResultDto } from './result.dto'

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    @InjectRepository(ResultSubject)
    private readonly resultSubjectRepository: Repository<ResultSubject>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(createDto: CreateResultDto, userId?: number): Promise<Result> {
    const student = await this.studentRepository.findOne({
      where: { id: createDto.studentId },
    })

    if (!student) {
      throw new NotFoundException('Student not found')
    }

    const course = await this.courseRepository.findOne({
      where: { id: createDto.courseId },
    })

    if (!course) {
      throw new NotFoundException('Course not found')
    }

    let totalMarks = 0
    let obtainedMarks = 0

    createDto.subjects.forEach((subject) => {
      totalMarks += subject.maxMarks
      obtainedMarks += subject.obtainedMarks
    })

    const percentage = (obtainedMarks / totalMarks) * 100
    const grade = this.calculateGrade(percentage)

    const result = this.resultRepository.create({
      ...createDto,
      totalMarks,
      obtainedMarks,
      percentage,
      grade,
    })

    const savedResult = await this.resultRepository.save(result)

    const resultSubjects = createDto.subjects.map((subject) =>
      this.resultSubjectRepository.create({
        resultId: savedResult.id,
        ...subject,
      }),
    )

    await this.resultSubjectRepository.save(resultSubjects)

    return this.findOne(savedResult.id)
  }

  async findAll(filters?: {
    studentId?: number
    courseId?: number
    status?: string
  }): Promise<Result[]> {
    const where: any = { deletedAt: IsNull() }

    if (filters?.studentId) where.studentId = filters.studentId
    if (filters?.courseId) where.courseId = filters.courseId
    if (filters?.status) where.status = filters.status

    return await this.resultRepository.find({
      where,
      relations: ['student', 'course', 'subjects', 'subjects.subject'],
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Result> {
    const result = await this.resultRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['student', 'course', 'subjects', 'subjects.subject'],
    })

    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`)
    }

    return result
  }

  async findByStudent(studentId: number): Promise<Result[]> {
    return await this.resultRepository.find({
      where: { studentId, deletedAt: IsNull() },
      relations: ['course', 'subjects', 'subjects.subject'],
      order: { examDate: 'DESC' },
    })
  }

  async findStudentByEmail(email: string): Promise<Student | null> {
    return await this.studentRepository.findOne({
      where: { email },
    })
  }

  async update(id: number, updateDto: UpdateResultDto): Promise<Result> {
    const result = await this.findOne(id)

    if (updateDto.subjects) {
      await this.resultSubjectRepository.delete({ resultId: id })

      let totalMarks = 0
      let obtainedMarks = 0

      updateDto.subjects.forEach((subject) => {
        totalMarks += subject.maxMarks
        obtainedMarks += subject.obtainedMarks
      })

      const percentage = (obtainedMarks / totalMarks) * 100
      const grade = this.calculateGrade(percentage)

      Object.assign(result, updateDto, { totalMarks, obtainedMarks, percentage, grade })

      const resultSubjects = updateDto.subjects.map((subject) =>
        this.resultSubjectRepository.create({
          resultId: id,
          ...subject,
        }),
      )

      await this.resultSubjectRepository.save(resultSubjects)
    } else {
      Object.assign(result, updateDto)
    }

    return await this.resultRepository.save(result)
  }

  async publish(id: number, publishDto: PublishResultDto, userId: number): Promise<Result> {
    const result = await this.findOne(id)

    result.isPublished = publishDto.isPublished
    result.status = publishDto.isPublished ? ResultStatus.PUBLISHED : ResultStatus.UNPUBLISHED
    result.publishedAt = publishDto.isPublished ? new Date() : undefined
    result.publishedBy = publishDto.isPublished ? userId : undefined

    return await this.resultRepository.save(result)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.resultRepository.softDelete(id)
  }

  private calculateGrade(percentage: number): string {
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B+'
    if (percentage >= 60) return 'B'
    if (percentage >= 50) return 'C'
    if (percentage >= 40) return 'D'
    return 'F'
  }

  async uploadExcel(file: any, courseId: number, examName: string, semester: string, academicYear: string): Promise<{ success: number; failed: number; errors: string[] }> {
    throw new BadRequestException('Excel upload feature requires xlsx package. Please install: npm install xlsx @types/xlsx')
  }

  async downloadPDF(id: number): Promise<Buffer> {
    throw new BadRequestException('PDF download feature requires pdfkit package. Please install: npm install pdfkit @types/pdfkit')
  }
}
