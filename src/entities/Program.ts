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
import { Department } from './Department'
import { Stream } from './Stream'

export enum ProgramStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('programs')
export class Program {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 100, unique: true })
  code: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'int', nullable: true })
  duration: number

  @Column({ type: 'varchar', length: 50, nullable: true })
  durationType: string

  @Column({ type: 'int' })
  departmentId: number

  @ManyToOne(() => Department, (department) => department.programs)
  @JoinColumn({ name: 'departmentId' })
  department: Department

  @OneToMany(() => Stream, (stream) => stream.program)
  streams: Stream[]

  @Column({
    type: 'enum',
    enum: ProgramStatus,
    default: ProgramStatus.ACTIVE,
  })
  status: ProgramStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
