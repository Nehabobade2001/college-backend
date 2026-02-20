import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginDto,
  RequestOtpDto,
  VerifyOtpDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './auth-controller.dto';
import { JwtAuthGuard } from '@/common/auth/jwt.guard';
import { RolesGuard } from '@/common/auth/roles.guard';
import { Roles } from '@/common/decorators/Roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Admin Login
  @Post('admin/request-otp')
  @HttpCode(HttpStatus.OK)
  async adminRequestOtp(@Body() requestOtpDto: RequestOtpDto) {
    return await this.authService.requestOtp(requestOtpDto, 'admin');
  }

  @Post('admin/verify-otp')
  @HttpCode(HttpStatus.OK)
  async adminVerifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const result = await this.authService.validateOtp({
      email: verifyOtpDto.email,
      password: verifyOtpDto.password,
      otp: verifyOtpDto.otp,
    }, 'admin');
    return {
      message: 'Login successful',
      data: result,
    };
  }

  // Franchise Login
  @Post('franchise/request-otp')
  @HttpCode(HttpStatus.OK)
  async franchiseRequestOtp(@Body() requestOtpDto: RequestOtpDto) {
    return await this.authService.requestOtp(requestOtpDto, 'franchise');
  }

  @Post('franchise/verify-otp')
  @HttpCode(HttpStatus.OK)
  async franchiseVerifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const result = await this.authService.validateOtp({
      email: verifyOtpDto.email,
      password: verifyOtpDto.password,
      otp: verifyOtpDto.otp,
    }, 'franchise');
    return {
      message: 'Login successful',
      data: result,
    };
  }

  // Student Login
  @Post('student/request-otp')
  @HttpCode(HttpStatus.OK)
  async studentRequestOtp(@Body() requestOtpDto: RequestOtpDto) {
    return await this.authService.requestOtp(requestOtpDto, 'student');
  }

  @Post('student/verify-otp')
  @HttpCode(HttpStatus.OK)
  async studentVerifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const result = await this.authService.validateOtp({
      email: verifyOtpDto.email,
      password: verifyOtpDto.password,
      otp: verifyOtpDto.otp,
    }, 'student');
    return {
      message: 'Login successful',
      data: result,
    };
  }

  // Forgot Password
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto.email);
  }

  // Reset Password
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    const result = await this.authService.resetPassword(
      {
        email: resetPasswordDto.email,
        otp: resetPasswordDto.otp,
        password: '',
      },
      resetPasswordDto.newPassword,
    );
    return {
      message: 'Password reset successful',
      data: result,
    };
  }

  // Logout
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Headers('authorization') authorization: string) {
    const token = authorization.split(' ')[1];
    await this.authService.logout(token);
    return {
      message: 'Logout successful',
    };
  }

  // Get Current User Profile
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return {
      message: 'Profile fetched successfully',
      data: req.user,
    };
  }

  // Admin Only Route Example
  @Get('admin/dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Admin', 'Organization Admin')
  async adminDashboard() {
    return {
      message: 'Welcome to Admin Dashboard',
    };
  }

  // Franchise Only Route Example
  @Get('franchise/dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Franchise', 'Organization Admin')
  async franchiseDashboard() {
    return {
      message: 'Welcome to Franchise Dashboard',
    };
  }

  // Student Only Route Example
  @Get('student/dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('Student', 'Organization Employee')
  async studentDashboard() {
    return {
      message: 'Welcome to Student Dashboard',
    };
  }
}
