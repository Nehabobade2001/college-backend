import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Student } from '@/entities/Student'
import { User } from '@/entities/User'
import { Role } from '@/entities/Role'
import { UserRole } from '@/entities/UserRole'
import { StudentService } from './student.service'
import { StudentController } from './student.controller'
import { GlobalModule } from '../global/global.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, User, Role, UserRole]),
    GlobalModule,
  ],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService],
})
export class StudentModule {}
