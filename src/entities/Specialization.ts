import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Stream } from './Stream'

export enum SpecializationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('specializations')
export class Specialization {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  name: string

  @Column({ type: 'varchar', length: 100, unique: true })
  code: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'int', nullable: true })
  streamId: number

  @ManyToOne(() => Stream, (stream) => stream.specializations, { nullable: true })
  @JoinColumn({ name: 'streamId' })
  stream: Stream

  @Column({
    type: 'enum',
    enum: SpecializationStatus,
    default: SpecializationStatus.ACTIVE,
  })
  status: SpecializationStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
