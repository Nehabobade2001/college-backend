import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  exports: [PassportModule, JwtModule],
})
export class PassportConfigModule {}
