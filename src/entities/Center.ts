/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity('centers')
export class Center {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  franchiseName?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ownerName?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  contactNumber?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  alternateNumber?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string | null;
  @Column({ type: 'varchar', length: 255, nullable: true })
  city?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  state?: string | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  pincode?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  registrationNumber?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gstNumber?: string | null;

  @Column({ type: 'date', nullable: true })
  agreementStartDate?: Date | null;

  @Column({ type: 'date', nullable: true })
  agreementEndDate?: Date | null;
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany('Student', 'center')
  students?: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
