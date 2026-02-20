import { Otp } from '@/entities/User'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, LessThan, MoreThan, Repository } from 'typeorm'
import {
  ForgetPasswordDto,
  LoginDto,
  OtpRequestDto,
  ValidateDto,
} from '../auth/auth.dto'

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
  ) {}

  // Generate an OTP and save it in the database
  async generateOtp(
    otpRequestDto: Partial<OtpRequestDto>,
    manager: EntityManager,
    type:
      | 'login'
      | 'register'
      | 'reset-password'
      | 'verify-email'
      | 'forgot-password'
      | 'change-password',
    time: number,
  ): Promise<number | null> {
    // find old otp
    const existingOtp = await manager.findOne(Otp, {
      where: {
        email: otpRequestDto.email,
        createdAt: MoreThan(new Date(new Date().getTime() - time * 60000)), // Check if created within last 5 minutes
      },
    })

    if (existingOtp) {
      return null // Return existing OTP if still valid
    }

    // generate 6 digit random number as OTP
    // const otp = Math.floor(100000 + Math.random() * 900000)
    const otp = 123456

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 5) // OTP expires in 5 minutes

    const otpEntity = manager.create(Otp, {
      otp,
      email: otpRequestDto.email,
      otpType: type,
      expiresAt,
    })
    await manager.save(otpEntity)

    return otp
  }

  // Verify the OTP
  async verifyOtp(
    loginDto: LoginDto,
    manager: EntityManager,
  ): Promise<boolean> {
    const otpEntity = await manager.findOne(Otp, {
      where: {
        otp: loginDto?.otp,
        email: loginDto?.email,
        otpType: 'login',
      },
    })

    if (otpEntity) {
      const now = new Date()
      const otpExpiresAt = new Date(otpEntity.expiresAt)

      if (otpExpiresAt.getTime() > now.getTime()) {
        await this.otpRepository.delete(otpEntity.id) // Remove OTP after successful verification
        return true
      } else {
        await this.otpRepository.delete(otpEntity.id) // Remove expired OTP
      }
    }

    return false
  }

  // Generate OTP for password reset
  async generateOtpForPasswordReset(
    forgetPasswordDto: ForgetPasswordDto,
  ): Promise<number> {
    // const otp = Math.floor(100000 + Math.random() * 900000)
    const otp = 123456

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 5) // OTP expires in 5 minutes

    const otpEntity = this.otpRepository.create({
      otp,
      email: forgetPasswordDto.email,
      expiresAt,
    })
    await this.otpRepository.save(otpEntity)

    return otp
  }

  // Verify OTP for password reset
  async verifyOtpForPasswordReset(
    email: string,
    otp: number,
  ): Promise<boolean> {
    const otpEntity = await this.otpRepository.findOne({
      where: { email, otp },
    })

    if (otpEntity) {
      const now = new Date()
      const otpExpiresAt = new Date(otpEntity.expiresAt)

      if (otpExpiresAt.getTime() > now.getTime()) {
        await this.otpRepository.delete(otpEntity.id) // Remove OTP after successful verification
        return true
      } else {
        await this.otpRepository.delete(otpEntity.id) // Remove expired OTP
      }
    }
    return false
  }

  // Delete the OTP after successful verification
  async deleteOtp(
    loginDto: ValidateDto,
    manager: EntityManager,
  ): Promise<void> {
    // delete old otp more than 5 minutes
    const oldOtp = await manager.findOne(Otp, {
      where: {
        email: loginDto.email,
        createdAt: LessThan(new Date(new Date().getTime() - 5 * 60000)),
      },
    })

    if (oldOtp) {
      await manager.delete(Otp, oldOtp.id)
    }
    await manager.delete(Otp, {
      otp: loginDto.otp,
      email: loginDto.email,
    })
  }

  // Delete the OTP after successful verification
  async deleteOtpOfReset(otp: number, email: string): Promise<void> {
    await this.otpRepository.delete({
      otp: otp,
      email: email,
    })
  }
}
