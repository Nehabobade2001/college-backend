import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from './Role'

@Entity('role_permissions')
export class RolePermissions {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  roleId: number

  @Column({ type: 'int' })
  permissionId: number

  @ManyToOne(() => Role, (role) => role.rolePermissions)
  role: Role

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date | null
}
