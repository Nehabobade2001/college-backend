/* eslint-disable prettier/prettier */
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
import { ComplaintService } from './complaint.service'
import { CreateComplaintDto, FilterComplaintDto, UpdateComplaintDto } from './complaint.dto'
import { ListInputDTO } from '@/common/paginationDto/withPagination'

@Controller('complaints')
@UseGuards(JwtAuthGuard)
export class ComplaintController {
  constructor(private readonly complaintService: ComplaintService) {}

  @Post()
  async create(@Body() data: CreateComplaintDto) {
    return await this.complaintService.create(data)
  }

  @Get()
  async findAll(@Query() filter: FilterComplaintDto) {
    return await this.complaintService.findAll(filter)
  }

  @Get('paginated')
  async findPaginated(
    @Query() listInput: ListInputDTO,
    @Query() filter: FilterComplaintDto,
  ) {
    return await this.complaintService.listWithPagination(listInput, filter)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.complaintService.findById(id)
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateComplaintDto) {
    return await this.complaintService.update(id, data)
  }

  @Patch(':id/assign')
  async assignToCenter(
    @Param('id') id: number,
    @Body() body: { centerId: number; assignedTo?: number },
  ) {
    return await this.complaintService.assignToCenter(id, body.centerId, body.assignedTo)
  }

  @Patch(':id/resolve')
  async resolve(@Param('id') id: number, @Body() body: { resolution: string }) {
    return await this.complaintService.resolve(id, body.resolution)
  }

  @Patch(':id/close')
  async close(@Param('id') id: number) {
    return await this.complaintService.close(id)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.complaintService.remove(id)
    return { message: 'Complaint deleted successfully' }
  }
}
