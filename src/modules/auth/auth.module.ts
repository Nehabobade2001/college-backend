import { PassportConfigModule } from '@/config/PassportConfig'
import { Module } from '@nestjs/common'
import { UsersModule } from '../user/users.module'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { RolesGuard } from '@/common/auth/roles.guard'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '@/entities/User'

@Module({
  imports: [UsersModule, PassportConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, PassportConfigModule, RolesGuard],
  exports: [RolesGuard],
})
export class AuthModule { }
