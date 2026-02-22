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
import { ProgramService } from './program.service'
import { CreateProgramDto, UpdateProgramDto } from './program.dto'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { RolesGuard } from '@/common/auth/roles.guard'
import { Roles } from '@/common/decorators/Roles.decorator'

@Controller('programs')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Organization Admin')
export class ProgramController {
  constructor(private readonly service: ProgramService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateProgramDto) {
    const data = await this.service.create(createDto)
    return { message: 'Program created successfully', data }
  }

  @Get()
  async findAll() {
    const data = await this.service.findAll()
    return { message: 'Programs fetched successfully', data }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.service.findOne(id)
    return { message: 'Program fetched successfully', data }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateProgramDto) {
    const data = await this.service.update(id, updateDto)
    return { message: 'Program updated successfully', data }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id)
  }
}
