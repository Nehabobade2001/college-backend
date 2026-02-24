/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import { CourseService } from './course.service'
import { CreateCourseDto, UpdateCourseDto, AssignSubjectsDto } from './course.dto'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { RolesGuard } from '@/common/auth/roles.guard'
import { Roles } from '@/common/decorators/Roles.decorator'

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Organization Admin')
export class CourseController {
  constructor(private readonly service: CourseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateCourseDto) {
    const data = await this.service.create(createDto)
    return { message: 'Course created successfully', data }
  }

  @Get()
  async findAll() {
    const data = await this.service.findAll()
    return { message: 'Courses fetched successfully', data }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.service.findOne(id)
    return { message: 'Course fetched successfully', data }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourseDto,
  ) {
    const data = await this.service.update(id, updateDto)
    return { message: 'Course updated successfully', data }
  }

  @Post(':id/subjects')
  async assignSubjects(
    @Param('id', ParseIntPipe) id: number,
    @Body() assignDto: AssignSubjectsDto,
  ) {
    const data = await this.service.assignSubjects(id, assignDto)
    return { message: 'Subjects assigned successfully', data }
  }

  @Delete(':id/subjects/:subjectId')
  @HttpCode(HttpStatus.OK)
  async removeSubject(
    @Param('id', ParseIntPipe) id: number,
    @Param('subjectId', ParseIntPipe) subjectId: number,
  ) {
    const data = await this.service.removeSubject(id, subjectId)
    return { message: 'Subject removed successfully', data }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id)
  }
}
