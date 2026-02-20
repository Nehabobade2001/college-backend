import { Global, Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ApiTokenService } from '../auth/apiToken.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ApiToken } from '@/entities/ApiToken'
import { Otp, User } from '@/entities/User'
import { MailerModule } from '@nestjs-modules/mailer'
import * as path from 'path'
import { MJMLAdapter } from '@/common/adapter/mjml.adapter'
import { AppSetting } from '@/entities/AppSetting'
import { MailService } from './mail.service'
import { OtpService } from './otp.service'
import { FileUploadModule } from '../fileUpload/fileUpload.module'

@Global()
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: process.env.EMAIL_FROM,
      },
      template: {
        dir: path.join(process.cwd(), 'src', 'templates'),
        adapter: new MJMLAdapter(),
        options: {
          strict: true,
          partials: {
            dir: path.join(process.cwd(), 'src', 'templates', 'partials'),
            options: {
              strict: true,
            },
          },
        },
      },
    }),
    TypeOrmModule.forFeature([User, ApiToken, Otp, AppSetting]),
    FileUploadModule,
  ],
  providers: [JwtService, ApiTokenService, OtpService, MailService],
  exports: [
    JwtService,
    TypeOrmModule,
    ApiTokenService,
    MailerModule,
    MailService,
    OtpService,
  ],
})
export class GlobalModule {}
