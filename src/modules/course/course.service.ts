/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, In, IsNull } from 'typeorm'
import { Course } from '@/entities/Course'
import { Subject } from '@/entities/Subject'
import { CreateCourseDto, UpdateCourseDto, AssignSubjectsDto } from './course.dto'

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async create(createDto: CreateCourseDto): Promise<Course> {
    const exists = await this.courseRepository.findOne({
      where: { code: createDto.code },
    })

    if (exists) {
      throw new ConflictException(`Course with code ${createDto.code} already exists`)
    }

    const course = this.courseRepository.create(createDto)

    if (createDto.subjectIds && createDto.subjectIds.length > 0) {
      const subjects = await this.subjectRepository.findBy({
        id: In(createDto.subjectIds),
      })
      course.subjects = subjects
    }

    return await this.courseRepository.save(course)
  }

  async findAll(): Promise<Course[]> {
    return await this.courseRepository.find({
      where: { deletedAt: IsNull() },
      relations: ['program', 'subjects'],
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepository.findOne({
      where: { id, deletedAt: IsNull() },
      relations: ['program', 'subjects'],
    })

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`)
    }

    return course
  }

  async update(id: number, updateDto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id)

    if (updateDto.code && updateDto.code !== course.code) {
      const exists = await this.courseRepository.findOne({
        where: { code: updateDto.code },
      })

      if (exists) {
        throw new ConflictException(`Course with code ${updateDto.code} already exists`)
      }
    }

    if (updateDto.subjectIds) {
      const subjects = await this.subjectRepository.findBy({
        id: In(updateDto.subjectIds),
      })
      course.subjects = subjects
    }

    Object.assign(course, updateDto)
    return await this.courseRepository.save(course)
  }

  async assignSubjects(id: number, assignDto: AssignSubjectsDto): Promise<Course> {
    const course = await this.findOne(id)

    const subjects = await this.subjectRepository.findBy({
      id: In(assignDto.subjectIds),
    })

    if (subjects.length !== assignDto.subjectIds.length) {
      throw new NotFoundException('Some subjects not found')
    }

    course.subjects = subjects
    return await this.courseRepository.save(course)
  }

  async removeSubject(courseId: number, subjectId: number): Promise<Course> {
    const course = await this.findOne(courseId)

    course.subjects = course.subjects.filter((subject) => subject.id !== subjectId)

    return await this.courseRepository.save(course)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.courseRepository.softDelete(id)
  }
}
