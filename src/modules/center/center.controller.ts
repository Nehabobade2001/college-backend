import { Controller, Get, Post, Put, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CenterService } from './center.service';
import { CreateCenterDto, UpdateCenterDto } from './center.dto';
import { JwtAuthGuard } from '@/common/auth/jwt.guard';
import { Permissions } from '@/common/decorators/PermissionDecorator';

@UseGuards(JwtAuthGuard)
@Controller('centers')
export class CenterController {
  constructor(private readonly centerService: CenterService) {}

  @Get()
  @Permissions('MasterApp:Center:Read')
  async list() {
    return this.centerService.findAll();
  }

  @Post()
  @Permissions('MasterApp:Center:Create')
  async create(@Body() dto: CreateCenterDto, @Req() req: any) {
    return this.centerService.create(dto, req.user);
  }

  @Get(':id')
  @Permissions('MasterApp:Center:Read')
  async get(@Param('id') id: number) {
    return this.centerService.findOne(id);
  }

  @Put(':id')
  @Permissions('MasterApp:Center:Update')
  async update(@Param('id') id: number, @Body() dto: UpdateCenterDto) {
    return this.centerService.update(id, dto);
  }

  @Patch(':id/deactivate')
  @Permissions('MasterApp:Center:Action')
  async deactivate(@Param('id') id: number) {
    return this.centerService.deactivate(id);
  }

  @Patch(':id/activate')
  @Permissions('MasterApp:Center:Action')
  async activate(@Param('id') id: number) {
    return this.centerService.activate(id);
  }
}
