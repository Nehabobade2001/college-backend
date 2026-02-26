import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '@/common/auth/jwt.guard'
import { CurrentUser } from '@/common/decorators/CurrentUser'
import { EventService } from './event.service'
import { CreateEventDto, FilterEventDto, UpdateEventDto } from './event.dto'
import { ListInputDTO } from '@/common/paginationDto/withPagination'

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async create(@Body() data: CreateEventDto, @CurrentUser() user: any) {
    return await this.eventService.create(data, user.id)
  }

  @Get()
  async findAll(@Query() filter: FilterEventDto) {
    return await this.eventService.findAll(filter)
  }

  @Get('paginated')
  async findPaginated(
    @Query() listInput: ListInputDTO,
    @Query() filter: FilterEventDto,
  ) {
    return await this.eventService.listWithPagination(listInput, filter)
  }

  @Get('center/:centerId')
  async findByCenter(@Param('centerId') centerId: number) {
    return await this.eventService.findByCenter(centerId)
  }

  @Get('student/:studentId')
  async findByStudent(@Param('studentId') studentId: number) {
    return await this.eventService.findByStudent(studentId)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.eventService.findById(id)
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateEventDto) {
    return await this.eventService.update(id, data)
  }

  @Patch(':id/publish')
  async publish(@Param('id') id: number) {
    return await this.eventService.publish(id)
  }

  @Patch(':id/archive')
  async archive(@Param('id') id: number) {
    return await this.eventService.archive(id)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.eventService.remove(id)
    return { message: 'Event deleted successfully' }
  }
}
