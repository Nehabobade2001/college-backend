/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginRes, OtpRes, User } from '@/entities/User'
import { OtpRequestDto, RegisterDto, ValidateDto } from './auth.dto'

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // send email verification OTP
  @Mutation(() => OtpRes)
  async sendRegistrationOtp(@Args('email') email: string): Promise<OtpRes> {
    return this.authService.sendVerifyEmailOtp(email)
  }

  // Register a new user
  //   @Mutation(() => User)
  //   async register(
  //     @Args('registerData') registerData: RegisterDto,
  //   ): Promise<User> {
  //     return this.authService.register(registerData)
  //   }

  @Mutation(() => LoginRes)
  async register(
    @Args('registerData') registerData: RegisterDto,
  ): Promise<LoginRes> {
    return this.authService.register(registerData)
  }

  // Request OTP
  @Mutation(() => OtpRes)
  async requestOtp(
    @Args('otpRequestData') otpRequestData: OtpRequestDto,
  ): Promise<OtpRes> {
    return this.authService.requestOtp(otpRequestData)
  }

  // login
  @Mutation(() => LoginRes)
  async login(@Args('loginData') loginData: ValidateDto): Promise<LoginRes> {
    return this.authService.validateOtp(loginData)
  }

  // logout
  @Mutation(() => Boolean)
  async logout(@Context('req') req: any): Promise<boolean> {
    return this.authService.logout(req.headers.authorization?.split(' ')[1])
  }

  // Reset password
  @Mutation(() => Boolean)
  async resetPassword(
    @Args('reset') validateDto: ValidateDto,
    @Args('newPassword') newPassword: string,
  ): Promise<User> {
    return this.authService.resetPassword(validateDto, newPassword)
  }

  // Forgot password
  @Mutation(() => Boolean)
  async forgotPassword(@Args('email') email: string): Promise<OtpRes> {
    return this.authService.forgotPassword(email)
  }
}
