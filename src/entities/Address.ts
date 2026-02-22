import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'

export enum AddressType {
  PERMANENT = 'permanent',
  CURRENT = 'current',
  OFFICE = 'office',
  OTHER = 'other',
}

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 255 })
  addressLine1: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  addressLine2: string

  @Column({ type: 'varchar', length: 100 })
  city: string

  @Column({ type: 'varchar', length: 100 })
  state: string

  @Column({ type: 'varchar', length: 100 })
  country: string

  @Column({ type: 'varchar', length: 20 })
  pincode: string

  @Column({
    type: 'enum',
    enum: AddressType,
    default: AddressType.CURRENT,
  })
  type: AddressType

  @Column({ type: 'varchar', length: 50, nullable: true })
  landmark: string

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
