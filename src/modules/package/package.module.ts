import { Package } from '@/entities/Package'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PackageService } from './package.service'
import { PackageResolver } from './package.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Package])],
  providers: [PackageService, PackageResolver],
  exports: [PackageService],
})
export class PackageModule {}
