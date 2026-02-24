import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Course } from '@/entities/Course'
import { Subject } from '@/entities/Subject'
import { CourseController } from './course.controller'
import { CourseService } from './course.service'

@Module({
  imports: [TypeOrmModule.forFeature([Course, Subject])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
