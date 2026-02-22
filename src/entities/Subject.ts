import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

export enum SubjectStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum SubjectType {
  THEORY = 'theory',
  PRACTICAL = 'practical',
  BOTH = 'both',
}

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 100, unique: true })
  code: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({
    type: 'enum',
    enum: SubjectType,
    default: SubjectType.THEORY,
  })
  type: SubjectType

  @Column({ type: 'int', nullable: true })
  credits: number

  @Column({ type: 'int', nullable: true })
  maxMarks: number

  @Column({ type: 'int', nullable: true })
  minMarks: number

  @Column({
    type: 'enum',
    enum: SubjectStatus,
    default: SubjectStatus.ACTIVE,
  })
  status: SubjectStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
