import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { Student } from './Student'
import { Course } from './Course'
import { Subject } from './Subject'

export enum ResultStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  UNPUBLISHED = 'unpublished',
}

export enum ResultType {
  INTERNAL = 'internal',
  EXTERNAL = 'external',
  FINAL = 'final',
}

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  studentId: number

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'studentId' })
  student: Student

  @Column({ type: 'int' })
  courseId: number

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'courseId' })
  course: Course

  @Column({ type: 'varchar', length: 100 })
  examName: string

  @Column({ type: 'varchar', length: 50 })
  semester: string

  @Column({ type: 'varchar', length: 50 })
  academicYear: string

  @Column({ type: 'date' })
  examDate: Date

  @OneToMany(() => ResultSubject, (rs) => rs.result, { cascade: true })
  subjects: ResultSubject[]

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  totalMarks: number

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  obtainedMarks: number

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  percentage: number

  @Column({ type: 'varchar', length: 20 })
  grade: string

  @Column({ type: 'enum', enum: ResultType, default: ResultType.FINAL })
  resultType: ResultType

  @Column({ type: 'enum', enum: ResultStatus, default: ResultStatus.DRAFT })
  status: ResultStatus

  @Column({ type: 'boolean', default: false })
  isPublished: boolean

  @Column({ type: 'timestamp', nullable: true })
  publishedAt?: Date

  @Column({ type: 'int', nullable: true })
  publishedBy?: number

  @Column({ type: 'text', nullable: true })
  remarks: string

  @Column({ type: 'int', nullable: true })
  organizationId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}

@Entity('result_subjects')
export class ResultSubject {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  resultId: number

  @ManyToOne(() => Result, (result) => result.subjects)
  @JoinColumn({ name: 'resultId' })
  result: Result

  @Column({ type: 'int' })
  subjectId: number

  @ManyToOne(() => Subject)
  @JoinColumn({ name: 'subjectId' })
  subject: Subject

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  maxMarks: number

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  obtainedMarks: number

  @Column({ type: 'varchar', length: 20 })
  grade: string

  @Column({ type: 'boolean', default: false })
  isPassed: boolean
}
