import { About } from '@/entities/About'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AboutService } from './about.service'
import { AboutResolver } from './about.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([About])],
  providers: [AboutService, AboutResolver],
  exports: [AboutService],
})
export class AboutModule {}
