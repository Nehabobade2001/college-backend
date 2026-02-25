import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PermissionResolver } from './permission.resolver'
import { PermissionService } from './permission.service'
import { PermissionController } from './permission.controller'
import { Permissions } from '@/entities/Permissions'
import { User } from '@/entities/User'
import { PermissionRouteGuard } from '@/common/auth/permission-route.guard'

@Module({
  imports: [TypeOrmModule.forFeature([Permissions, User])],
  controllers: [PermissionController],
  providers: [PermissionResolver, PermissionService, PermissionRouteGuard],
  exports: [TypeOrmModule, PermissionService, PermissionRouteGuard],
})
export class PermissionModule { }
