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
import { SpecializationService } from './specialization.service'
import { CreateSpecializationDto, UpdateSpecializationDto } from './specialization.dto'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { RolesGuard } from '@/common/auth/roles.guard'
import { Roles } from '@/common/decorators/Roles.decorator'

@Controller('specializations')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Organization Admin')
export class SpecializationController {
  constructor(private readonly service: SpecializationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateSpecializationDto) {
    const data = await this.service.create(createDto)
    return { message: 'Specialization created successfully', data }
  }

  @Get()
  async findAll() {
    const data = await this.service.findAll()
    return { message: 'Specializations fetched successfully', data }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.service.findOne(id)
    return { message: 'Specialization fetched successfully', data }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateSpecializationDto) {
    const data = await this.service.update(id, updateDto)
    return { message: 'Specialization updated successfully', data }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id)
  }
}
