import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Center } from '../../entities/Center';
import { CenterController } from './center.controller';
import { CenterService } from './center.service';
import { GlobalModule } from '@/modules/global/global.module';

@Module({
  imports: [TypeOrmModule.forFeature([Center]), GlobalModule],
  controllers: [CenterController],
  providers: [CenterService],
})
export class CenterModule {}
