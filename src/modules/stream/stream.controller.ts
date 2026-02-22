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
import { StreamService } from './stream.service'
import { CreateStreamDto, UpdateStreamDto } from './stream.dto'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { RolesGuard } from '@/common/auth/roles.guard'
import { Roles } from '@/common/decorators/Roles.decorator'

@Controller('streams')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('Admin', 'Organization Admin')
export class StreamController {
  constructor(private readonly service: StreamService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDto: CreateStreamDto) {
    const data = await this.service.create(createDto)
    return { message: 'Stream created successfully', data }
  }

  @Get()
  async findAll() {
    const data = await this.service.findAll()
    return { message: 'Streams fetched successfully', data }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.service.findOne(id)
    return { message: 'Stream fetched successfully', data }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateStreamDto) {
    const data = await this.service.update(id, updateDto)
    return { message: 'Stream updated successfully', data }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.service.remove(id)
  }
}
