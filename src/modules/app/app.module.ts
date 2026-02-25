import { ApolloModule } from '@/config/ApolloConfig'
import { DatabaseConfig } from '@/config/DatabaseConfig'
import { UsersModule } from '@/modules/user/users.module'
import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { GlobalModule } from '../global/global.module'
import { RoleModule } from '../role/role.module'
import { PermissionModule } from '../permission/permission.module'
import { AboutModule } from '../Frontend/About/about.module'

import { CenterModule } from '../center/center.module'
import { CategoryModule } from '../category/category.module'
import { DepartmentModule } from '../department/department.module'
import { StudentModule } from '../student/student.module'
import { ProgramModule } from '../program/program.module'
import { StreamModule } from '../stream/stream.module'
import { SubjectModule } from '../subject/subject.module'
import { SpecializationModule } from '../specialization/specialization.module'
import { AddressModule } from '../address/address.module'
import { FeesModule } from '../fees/fees.module'
import { CourseModule } from '../course/course.module'
import { ResultModule } from '../result/result.module'


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
    CategoryModule,
    DepartmentModule,
    ProgramModule,
    StreamModule,
    SubjectModule,
    SpecializationModule,
    AddressModule,
    FeesModule,
    CourseModule,
    ResultModule,
    CenterModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
