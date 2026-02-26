/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Center } from './Center';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  firstName?: string | null;

  @Column({ type: 'varchar', nullable: true })
  lastName?: string | null;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', nullable: true })
  mobileNumber?: string | null;

  @Column({ type: 'varchar', nullable: true, select: false })
  password?: string | null;

  @Column({ type: 'boolean', default: false })
  isMe: boolean;

  @Column({ type: 'varchar', nullable: true })
  gender?: string | null;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date | null;

  @Column({ type: 'int', nullable: true })
  organizationId?: number | null;

  @Column({ type: 'int', nullable: true })
  userId?: number | null;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column({ type: 'int', nullable: true })
  centerId?: number | null;

  @ManyToOne(() => Center, { nullable: true })
  @JoinColumn({ name: 'centerId' })
  center?: Center;

  @Column({ type: 'varchar', default: 'active' })
  status: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  qualification?: string | null;

  @Column({ type: 'float', nullable: true })
  percentage?: number | null;

  @Column({ type: 'varchar', nullable: true })
  documentUrl?: string | null;

  @Column({ type: 'text', nullable: true })
  address?: string | null;

  @Column({ type: 'varchar', nullable: true })
  city?: string | null;

  @Column({ type: 'varchar', nullable: true })
  state?: string | null;

  @Column({ type: 'varchar', nullable: true })
  pincode?: string | null;

  @Column({ type: 'varchar', nullable: true })
  enrollmentNumber?: string | null;

  @Column({ type: 'varchar', nullable: true })
  courseName?: string | null;

  @Column({ type: 'varchar', nullable: true })
  branch?: string | null;

  @Column({ type: 'int', nullable: true })
  semester?: number | null;

  @Column({ type: 'date', nullable: true })
  admissionDate?: Date | null;

  @Column({ type: 'varchar', nullable: true })
  sessionYear?: string | null;

  @Column({ type: 'varchar', nullable: true })
  profilePhoto?: string | null;

  @Column({ type: 'varchar', nullable: true })
  aadhaarNumber?: string | null;

  @Column({ type: 'varchar', nullable: true })
  previousMarksheet?: string | null;

  @Column({ type: 'varchar', nullable: true })
  category?: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
