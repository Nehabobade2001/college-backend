import { ApolloModule } from '@/config/ApolloConfig'
import { DatabaseConfig } from '@/config/DatabaseConfig'
import { UsersModule } from '@/modules/user/users.module'
import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { GlobalModule } from '../global/global.module'
import { RoleModule } from '../role/role.module'
import { PermissionModule } from '../permission/permission.module'
import { AboutModule } from '../Frontend/About/about.module'

@Module({
  imports: [
    DatabaseConfig,
    ApolloModule,
    GlobalModule,
    AuthModule,
    UsersModule,
    RoleModule,
    PermissionModule,
    AboutModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
