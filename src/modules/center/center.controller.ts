import { Controller, Get, Post, Put, Patch, Body, Param, Req } from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto, UpdateCenterDto } from './center.dto';

@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Get()
  async list() {
    return this.centerService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateCenterDto, @Req() req: any) {
    return this.centerService.create(dto, req.user);
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    return this.centerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCenterDto) {
    return this.centerService.update(id, dto);
  }

  @Patch(':id/deactivate')
  async deactivate(@Param('id') id: number) {
    return this.centerService.deactivate(id);
  }

  @Patch(':id/activate')
  async activate(@Param('id') id: number) {
    return this.centerService.activate(id);
  }
}
