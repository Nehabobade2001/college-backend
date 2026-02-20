/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { throwGqlError } from '@/common/helpers/GraphQLErrorHandling'
import { ApiTokenService } from './apiToken.service'
import { DateTime } from 'luxon'
import { Designation, Otp, OtpRes, User, UserType } from '@/entities/User'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ErrorCodes } from '@/common/const/ErrorCodes'
import { MailService } from '../global/mail.service'
import { OtpRequestDto, RegisterDto, ValidateDto } from './auth.dto'
import { Role } from '@/entities/Role'
import { AppSetting } from '@/entities/AppSetting'
import { ApiToken } from '@/entities/ApiToken'
import * as argon2 from 'argon2'
import { OtpService } from '../global/otp.service'
import { Organization } from '@/entities/Organization'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
    private readonly mailService: MailService,
    private jwtService: JwtService,
    private apiToken: ApiTokenService,
  ) { }

  // send otp for email verification
  async sendVerifyEmailOtp(email: string): Promise<OtpRes> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // Establish real database connection
    await queryRunner.connect()

    // Start a new transaction
    await queryRunner.startTransaction()

    // Get the manager to perform operations
    const manager = queryRunner.manager

    // try-catch finally block
    try {
      const setting = await manager.findOne(AppSetting, {
        where: { id: 1 },
      })

      // Check if a user with the same email already exists
      const user = await manager.findOne(User, {
        where: { email: email ?? null },
      })

      if (user) {
        throwGqlError(ErrorCodes.DUPLICATE_EMAIL_INPUT, { email })
      }

      // check if otp is already generated and not expired
      const existingOtp = await manager.findOne(Otp, {
        where: {
          email,
          createdAt: new Date(
            new Date().getTime() - 5 * 60 * 1000, // 5 minutes ago
          ),
        },
      })

      if (existingOtp) {
        // Commit the transaction
        await queryRunner.commitTransaction()
        return {
          otpGeneratedSuccessfully: true,
          otp: existingOtp.otp,
          message: 'OTP already generated',
        }
      }
      // Generate OTP for the user's email
      const otp = await this.otpService.generateOtp(
        { email },
        manager,
        'verify-email',
        5,
      )

      if (otp !== null) {
        // Send OTP to mail
        this.mailService.sendMailVerify(otp, email, user, setting) // do not add await here
      }
      // Commit the transaction
      await queryRunner.commitTransaction()

      return { otpGeneratedSuccessfully: true, otp, message: 'OTP sent' } // Remove OTP from response in production
    } catch (error) {
      // If an error occurs, rollback the transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Release the query runner (real connection to the database)
      await queryRunner.release()
    }
  }

  // Register a new user
  //   async register(registerDto: RegisterDto): Promise<User> {
  //     const queryRunner =
  //       this.userRepository.manager.connection.createQueryRunner()

  //     // Establish real database connection
  //     await queryRunner.connect()

  //     // Start a new transaction
  //     await queryRunner.startTransaction()

  //     // Get the manager to perform operations
  //     const manager = queryRunner.manager

  //     try {
  //       const setting = await manager.findOne(AppSetting, {
  //         where: { id: 1 },
  //       })
  //       // find OTP
  //       const otpEntity = await manager.findOne(Otp, {
  //         where: {
  //           email: registerDto.email,
  //           otpType: 'verify-email',
  //           otp: registerDto.emailOTP,
  //         },
  //       })

  //       if (!otpEntity) {
  //         throwGqlError(ErrorCodes.INVALID_OTP_INPUT, {
  //           otp: registerDto.emailOTP,
  //         })
  //       }

  //       // Check if a user with the same email already exists
  //       const user = await manager.findOne(User, {
  //         where: { email: registerDto.email ?? null },
  //       })

  //       if (user) {
  //         throwGqlError(ErrorCodes.DUPLICATE_EMAIL_INPUT, {
  //           email: registerDto.email,
  //         })
  //       }

  //       // Create Organization if not exists
  //       const org = await manager.save(
  //         manager.create(Organization, {
  //           name: registerDto.organizationName,
  //           description: 'Organization description',
  //           status: 'active',
  //         }),
  //       )

  //       // Check if the role already exists
  //       const role = await manager.findOne(Role, {
  //         where: { name: 'primary_organization_admin_role' },
  //         relations: ['permissions'],
  //       })

  //       // Create and save the role if it doesn't exist
  //       const roles = await manager.save(
  //         manager.create(Role, {
  //           ...role,
  //           id: undefined, // Reset the ID to create a new role
  //           isPrimary: true,
  //           name: 'Organization Admin',
  //           status: 'active',
  //           organizationId: org.id,
  //         }),
  //       )

  //       const roleEmp = await manager.findOne(Role, {
  //         where: { name: 'primary_organization_employee_role' },
  //         relations: ['permissions'],
  //       })

  //       await manager.save(
  //         manager.create(Role, {
  //           ...roleEmp,
  //           id: undefined, // Reset the ID to create a new role
  //           isPrimary: false,
  //           name: 'Organization Employee',
  //           status: 'active',
  //           organizationId: org.id,
  //         }),
  //       )

  //       // Create and save the user
  //       const newUser = manager.create(User, {
  //         ...registerDto,
  //         password: registerDto.password,
  //         status: 'active',
  //         roles: [roles],
  //         organizationId: org.id,
  //         userType: UserType.organization,
  //       })

  //       await queryRunner.manager.save(newUser)

  //       // delete otp
  //       await queryRunner.manager.delete(Otp, otpEntity.id)

  //       this.mailService.welcomeMail(registerDto.email, user, setting) // do not add await here

  //       // Commit the transaction
  //       await queryRunner.commitTransaction()

  //       return newUser
  //     } catch (error) {
  //       // If an error occurs, rollback the transaction
  //       await queryRunner.rollbackTransaction()
  //       throw error
  //     } finally {
  //       // Release the query runner (real connection to the database)
  //       await queryRunner.release()
  //     }
  //   }

  async register(
    registerDto: RegisterDto,
  ): Promise<{ user: User; accessToken: string }> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const manager = queryRunner.manager

    try {
      const setting = await manager.findOne(AppSetting, { where: { id: 1 } })

      const otpEntity = await manager.findOne(Otp, {
        where: {
          email: registerDto.email,
          otpType: 'verify-email',
          otp: registerDto.emailOTP,
        },
      })

      if (!otpEntity) {
        throwGqlError(ErrorCodes.INVALID_OTP_INPUT, {
          otp: registerDto.emailOTP,
        })
      }

      const existingUser = await manager.findOne(User, {
        where: { email: registerDto.email ?? null },
      })

      if (existingUser) {
        throwGqlError(ErrorCodes.DUPLICATE_EMAIL_INPUT, {
          email: registerDto.email,
        })
      }

      const org = await manager.save(
        manager.create(Organization, {
          name: registerDto.organizationName,
          description: 'Organization description',
          status: 'active',
        }),
      )

      const role = await manager.findOne(Role, {
        where: { name: 'primary_organization_admin_role' },
        relations: ['permissions'],
      })

      const roles = await manager.save(
        manager.create(Role, {
          ...role,
          id: undefined,
          isPrimary: true,
          name: 'Organization Admin',
          status: 'active',
          organizationId: org.id,
        }),
      )

      const roleEmp = await manager.findOne(Role, {
        where: { name: 'primary_organization_employee_role' },
        relations: ['permissions'],
      })

      await manager.save(
        manager.create(Role, {
          ...roleEmp,
          id: undefined,
          isPrimary: false,
          name: 'Organization Employee',
          status: 'active',
          organizationId: org.id,
        }),
      )

      const newUser = manager.create(User, {
        ...registerDto,
        password: registerDto.password,
        status: 'active',
        roles: [roles],
        organizationId: org.id,
        userType: UserType.organization,
        designation: Designation.SUPER_ADMIN,
      })

      await queryRunner.manager.save(newUser)
      await queryRunner.manager.delete(Otp, otpEntity.id)

      try {
        this.mailService.welcomeMail(registerDto.email, newUser, setting) // do not add await here
      } catch (error) {
        //
      } // async

      await queryRunner.commitTransaction()

      // Generate tokens after successful registration
      const payload = { sub: newUser.id, email: newUser.email }
      const expiry = DateTime.now().plus({ days: 60 }).toJSDate()
      const token = await this.apiToken.generateJwtToken(newUser.id, expiry)
      const tokenId = token.token

      const accessToken = this.jwtService.sign({
        username: newUser.email,
        sub: newUser.id,
        tokenId,
      })

      await this.otpService.deleteOtp(
        {
          email: registerDto.email,
          otp: registerDto.emailOTP,
          password: registerDto.password,
        },
        manager,
      )

      const allPermissions = newUser.roles.reduce((acc, role) => {
        return [...acc, ...role.permissions.map((p) => p.slug)]
      }, [])

      newUser.permissions = allPermissions
      newUser.roles = newUser.roles.map((role) => {
        delete role.permissions
        return role
      })

      return { user: newUser, accessToken }
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }

  // Request OTP for login
  async requestOtp(requestOtp: OtpRequestDto, userType?: string): Promise<OtpRes> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // Establish real database connection
    await queryRunner.connect()

    // Start a new transaction
    await queryRunner.startTransaction()

    // Get the manager to perform operations
    const manager = queryRunner.manager

    // try-catch finally block
    try {
      const setting = await manager.findOne(AppSetting, {
        where: { id: 1 },
      })

      // Validate request input
      if (!requestOtp?.email || !requestOtp?.password) {
        throwGqlError(ErrorCodes.INVALID_USER_AND_PASSWORD)
      }

      // Find the user by email, scoped to the correct user type
      const user = await manager.findOne(User, {
        where: {
          email: requestOtp?.email ?? null,
          status: 'active',
          ...(userType ? { userType: userType as UserType } : {}),
        },
        select: ['id', 'email', 'password', 'name', 'username', 'userType'],
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND, {
          email: requestOtp?.email,
        })
      }

      // Validate password using argon2
      const isPasswordValid = await argon2.verify(
        user.password,
        requestOtp.password,
      )

      if (!isPasswordValid) {
        throwGqlError(ErrorCodes.INVALID_PASSWORD_INPUT, {
          password: requestOtp?.password,
        })
      }

      // Check if OTP is enabled in the settings
      if (setting && (setting.otpSMS || setting.otpEmail)) {
        // Generate OTP for the user's email
        const otp = await this.otpService.generateOtp(
          requestOtp,
          manager,
          'login',
          5,
        )

        // Send OTP to mail (optional)
        try {
          this.mailService.sendOtpMail(otp, requestOtp.email, user, setting) // do not add await here
        } catch (error) {
          //
        }

        // Commit the transaction
        await queryRunner.commitTransaction()

        return {
          otpGeneratedSuccessfully: true,
          otp: 123456, // TODO: remove hardcoded OTP before production — replace with: otp
          message: 'OTP sent to your email',
        }
      } else {
        // Commit the transaction
        await queryRunner.commitTransaction()
        
        return {
          otpGeneratedSuccessfully: false,
          otp: null,
          message: 'OTP is not enabled in the settings',
        }
      }
    } catch (error) {
      // If an error occurs, rollback the transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Release the query runner (real connection to the database)
      await queryRunner.release()
    }
  }

  // Validate OTP for login
  async validateOtp(
    validateDto: ValidateDto,
    userType?: string,
  ): Promise<{ user: User; accessToken: string }> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // Establish real database connection
    await queryRunner.connect()

    // Start a new transaction
    await queryRunner.startTransaction()

    // Get the manager to perform operations
    const manager = queryRunner.manager

    // try-catch finally block
    try {
      // Get setting
      const setting = await manager.findOne(AppSetting, {
        where: { id: 1 },
      })

      // Find user by email, scoped to the correct user type (full user with relations)
      const user = await manager.findOne(User, {
        where: {
          email: validateDto?.email ?? null,
          ...(userType ? { userType: userType as UserType } : {}),
        },
        relations: ['roles', 'roles.permissions'], // Ensure permissions are loaded
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND, { email: validateDto?.email })
      }

      // Fetch password separately (password has select:false on the column)
      const userWithPassword = await manager.findOne(User, {
        where: { id: user?.id },
        select: ['id', 'password'],
      })

      if (user.status === 'pending') {
        throwGqlError(ErrorCodes.USER_ACTIVATION_IS_PENDING)
      }

      // if user is not active then throw error message to activate user
      if (user.status === 'inactive') {
        throwGqlError(ErrorCodes.USER_IS_INACTIVE, {
          email: validateDto?.email,
        })
      }

      // If user is blocked, throw error message
      if (user.status === 'blocked') {
        throwGqlError(ErrorCodes.USER_IS_BLOCKED, { email: validateDto?.email })
      }

      // Verify password before checking OTP (Fix: password was not checked in step 2)
      const isPasswordValid = await argon2.verify(
        userWithPassword.password,
        validateDto.password,
      )

      if (!isPasswordValid) {
        throwGqlError(ErrorCodes.INVALID_PASSWORD_INPUT, {
          password: validateDto?.password,
        })
      }

      if (setting?.otpSMS || setting?.otpEmail) {
        const isOtpValid = await this.otpService.verifyOtp(validateDto, manager)

        if (!isOtpValid) {
          throwGqlError(ErrorCodes.INVALID_OTP_INPUT, { otp: validateDto?.otp })
        }
      }

      // Create JWT Auth token with 1-day expiration
      const expiry = DateTime.now().plus({ days: 60 }).toJSDate()
      const token = await this.apiToken.generateJwtToken(user.id, expiry)
      const tokenId = token.token

      const accessToken = this.jwtService.sign({
        username: user.email,
        sub: user.id,
        tokenId,
      })
      // Parallelizing delete OTP and user save operations
      await this.otpService.deleteOtp(validateDto, manager)

      const allPermissions = user.roles.reduce((acc, role) => {
        return [...acc, ...role.permissions.map((p) => p.slug)]
      }, [])

      user.permissions = allPermissions
      user.roles = user.roles.map((role) => {
        delete role.permissions
        return role
      })

      // Commit the transaction
      await queryRunner.commitTransaction()

      return { user, accessToken }
    } catch (error) {
      // If an error occurs, rollback the transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Release the query runner (real connection to the database)
      await queryRunner.release()
    }
  }

  // Logout the user
  async logout(accessToken: string): Promise<boolean> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // Establish real database connection
    await queryRunner.connect()

    // Start a new transaction
    await queryRunner.startTransaction()

    // Get the manager to perform operations
    const manager = queryRunner.manager

    // try-catch finally block
    try {
      // Decode JWT token
      const decoded = this.jwtService.decode(accessToken) as {
        username: string
        tokenId: string
      }

      if (!decoded) {
        throwGqlError(ErrorCodes.INVALID_TOKEN)
      }

      // Find the user by email
      const user = await manager.findOne(User, {
        where: { email: decoded.username },
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND, { email: decoded.username })
      }

      // Find the JWT whitelist
      const jwtAuthWhitelist = await manager.findOne(ApiToken, {
        where: { token: decoded.tokenId },
      })

      if (!jwtAuthWhitelist) {
        throwGqlError(ErrorCodes.AUTH_TOKEN_NOT_FOUND)
      }

      // Delete JWT whitelist
      await manager.delete(ApiToken, jwtAuthWhitelist)

      // Commit the transaction
      await queryRunner.commitTransaction()

      return true
    } catch (error) {
      // If an error occurs, rollback the transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Release the query runner (real connection to the database)
      await queryRunner.release()
    }
  }

  // Reset password
  async resetPassword(
    validateDto: ValidateDto,
    newPassword: string,
  ): Promise<User> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // Establish real database connection
    await queryRunner.connect()

    // Start a new transaction
    await queryRunner.startTransaction()

    // Get the manager to perform operations
    const manager = queryRunner.manager

    // try-catch finally block
    try {
      // Find user by email
      const user = await manager.findOne(User, {
        where: { email: validateDto?.email ?? null },
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND, { email: validateDto?.email })
      }

      // Verify OTP
      const isOtpValid = await this.otpService.verifyOtp(validateDto, manager)

      if (!isOtpValid) {
        throwGqlError(ErrorCodes.INVALID_OTP_INPUT, { otp: validateDto?.otp })
      }

      // Hash the new password
      const hashedPassword = await argon2.hash(newPassword)

      // Update the user's password
      await manager.update(User, user.id, { password: hashedPassword })

      // Parallelizing delete OTP and user save operations
      await this.otpService.deleteOtp(validateDto, manager)

      // Commit the transaction
      await queryRunner.commitTransaction()

      return user
    } catch (error) {
      // If an error occurs, rollback the transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Release the query runner (real connection to the database)
      await queryRunner.release()
    }
  }

  // forgot password
  async forgotPassword(email: string): Promise<OtpRes> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner()

    // Establish real database connection
    await queryRunner.connect()

    // Start a new transaction
    await queryRunner.startTransaction()

    // Get the manager to perform operations
    const manager = queryRunner.manager

    // try-catch finally block
    try {
      const setting = await manager.findOne(AppSetting, {
        where: { id: 1 },
      })
      // Find the user by email
      const user = await manager.findOne(User, {
        where: { email: email ?? null },
      })

      if (!user) {
        throwGqlError(ErrorCodes.USER_NOT_FOUND, { email })
      }

      // Generate OTP for the user's email
      const otp = await this.otpService.generateOtp(
        { email },
        manager,
        'forgot-password',
        5,
      )

      // Send OTP to mail (optional)
      this.mailService.sendForgotPasswordMail(otp, email, user, setting) // do not add await here

      // Commit the transaction
      await queryRunner.commitTransaction()

      return { otpGeneratedSuccessfully: true, otp, message: 'OTP sent' } // Remove OTP from response in production
    } catch (error) {
      // If an error occurs, rollback the transaction
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      // Release the query runner (real connection to the database)
      await queryRunner.release()
    }
  }
}
