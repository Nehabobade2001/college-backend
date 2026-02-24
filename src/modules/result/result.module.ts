import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Result, ResultSubject } from '@/entities/Result'
import { Student } from '@/entities/Student'
import { Course } from '@/entities/Course'
import { ResultController } from './result.controller'
import { ResultService } from './result.service'

@Module({
  imports: [TypeOrmModule.forFeature([Result, ResultSubject, Student, Course])],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultModule {}
