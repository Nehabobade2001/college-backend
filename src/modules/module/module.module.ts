import { ApplicationModule } from '@/entities/Module'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApplicationModuleResolver } from './module.resolver'
import { ApplicationModuleService } from './module.service'

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationModule])],
  providers: [ApplicationModuleService, ApplicationModuleResolver],
  exports: [ApplicationModuleService],
})
export class ApplicationsModule {}
