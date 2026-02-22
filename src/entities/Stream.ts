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
import { Program } from './Program'
import { Specialization } from './Specialization'

export enum StreamStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('streams')
export class Stream {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 100, unique: true })
  code: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'int' })
  programId: number

  @ManyToOne(() => Program, (program) => program.streams)
  @JoinColumn({ name: 'programId' })
  program: Program

  @OneToMany(() => Specialization, (specialization) => specialization.stream)
  specializations: Specialization[]

  @Column({
    type: 'enum',
    enum: StreamStatus,
    default: StreamStatus.ACTIVE,
  })
  status: StreamStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
