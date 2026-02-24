/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Res,
  Request,
  NotFoundException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { ResultService } from './result.service'
import { CreateResultDto, UpdateResultDto, PublishResultDto, BulkUploadResultDto } from './result.dto'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { RolesGuard } from '@/common/auth/roles.guard'
import { Roles } from '@/common/decorators/Roles.decorator'

@Controller('results')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ResultController {
  constructor(private readonly service: ResultService) {}

  @Post()
  @Roles('Admin', 'Organization Admin')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateResultDto, @Request() req: any) {
    const data = await this.service.create(createDto, req.user?.id)
    return { message: 'Result created successfully', data }
  }

  @Get()
  async findAll(
    @Query('studentId', new ParseIntPipe({ optional: true })) studentId?: number,
    @Query('courseId', new ParseIntPipe({ optional: true })) courseId?: number,
    @Query('status') status?: string,
    @Request() req?: any,
  ) {
    // If user is a student, only show their results
    if (req.user?.userType === 'student') {
      const student = await this.service.findStudentByEmail(req.user.email)
      if (student) {
        studentId = student.id
      }
    }
    
    const data = await this.service.findAll({ studentId, courseId, status })
    return { message: 'Results fetched successfully', data }
  }

  @Get('my-results')
  async getMyResults(@Request() req: any) {
    const student = await this.service.findStudentByEmail(req.user.email)
    if (!student) {
      throw new NotFoundException('Student profile not found')
    }
    const data = await this.service.findByStudent(student.id)
    return { message: 'Your results fetched successfully', data }
  }

  @Get('student/:studentId')
  @Roles('Admin', 'Organization Admin')
  async findByStudent(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Request() req: any,
  ) {
    // Students can only view their own results
    if (req.user?.userType === 'student') {
      const student = await this.service.findStudentByEmail(req.user.email)
      if (!student || student.id !== studentId) {
        throw new NotFoundException('Access denied')
      }
    }
    
    const data = await this.service.findByStudent(studentId)
    return { message: 'Student results fetched successfully', data }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const data = await this.service.findOne(id)
    
    // Students can only view their own results
    if (req.user?.userType === 'student') {
      const student = await this.service.findStudentByEmail(req.user.email)
      if (!student || data.studentId !== student.id) {
        throw new NotFoundException('Result not found')
      }
    }
    
    return { message: 'Result fetched successfully', data }
  }

  @Put(':id')
  @Roles('Admin', 'Organization Admin')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateResultDto) {
    const data = await this.service.update(id, updateDto)
    return { message: 'Result updated successfully', data }
  }

  @Post(':id/publish')
  @Roles('Admin', 'Organization Admin')
  async publish(
    @Param('id', ParseIntPipe) id: number,
    @Body() publishDto: PublishResultDto,
    @Request() req: any,
  ) {
    const data = await this.service.publish(id, publishDto, req.user?.id)
    return { message: 'Result published successfully', data }
  }

  @Post('upload')
  @Roles('Admin', 'Organization Admin')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(
    @UploadedFile() file: any,
    @Body() uploadDto: BulkUploadResultDto,
  ) {
    const data = await this.service.uploadExcel(
      file,
      uploadDto.courseId,
      uploadDto.examName,
      uploadDto.semester,
      uploadDto.academicYear,
    )
    return { message: 'Results uploaded successfully', data }
  }

  @Get(':id/download/pdf')
  async downloadPDF(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
    @Request() req: any,
  ) {
    const result = await this.service.findOne(id)
    
    // Check if student is trying to download someone else's result
    if (req.user?.userType === 'student') {
      const student = await this.service.findStudentByEmail(req.user.email)
      if (student && result.studentId !== student.id) {
        throw new NotFoundException('Result not found')
      }
    }
    
    const buffer = await this.service.downloadPDF(id)
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=result-${id}.pdf`,
      'Content-Length': buffer.length,
    })
    res.send(buffer)
  }

  @Delete(':id')
  @Roles('Admin', 'Organization Admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id)
  }
}
