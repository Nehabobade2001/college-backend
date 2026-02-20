import {
  IsEmail,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'IsSixDigitOtp', async: false })
class IsSixDigitOtp implements ValidatorConstraintInterface {
  validate(value: number) {
    return value >= 100000 && value <= 999999
  }

  defaultMessage() {
    return 'OTP must be exactly 6 digits'
  }
}

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
    message:
      'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string

  @IsNumber()
  @Validate(IsSixDigitOtp)
  otp: number
}

export class OtpRequestDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
    message:
      'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string
}

export class ValidateDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
    message:
      'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string

  @IsNumber()
  @Validate(IsSixDigitOtp)
  otp: number
}

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string

  @IsNumber()
  @Validate(IsSixDigitOtp)
  otp: number

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
    message:
      'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  newPassword: string
}

export class ForgetPasswordDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string
}

export class RegisterDto {
  @IsString()
  name: string

  @IsOptional()
  @IsNumber()
  mobileNo?: number

  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  status?: 'active' | 'inactive' | 'blocked' | 'pending'

  @IsOptional()
  @IsString()
  avatar?: string

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/, {
    message:
      'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  password: string

  @IsOptional()
  @IsInt()
  createdBy?: number | null

  @IsOptional()
  @IsInt()
  roleId: number

  @IsNumber()
  @Validate(IsSixDigitOtp)
  emailOTP: number

  @IsString()
  organizationName: string
}
