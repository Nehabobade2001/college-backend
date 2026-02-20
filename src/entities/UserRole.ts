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
import { User } from './User'

@Entity('user_roles')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int' })
  roleId: number

  @Column({ type: 'int' })
  userId: number

  @ManyToOne(() => User, (user) => user.userRoles)
  user: User

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date | null
}
