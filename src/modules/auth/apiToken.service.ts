/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApiToken } from '@/entities/ApiToken'
import { User } from '@/entities/User'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { randomBytes } from 'crypto'
import { DateTime } from 'luxon'
import { LessThan, Repository } from 'typeorm'

@Injectable()
export class ApiTokenService {
  constructor(
    @InjectRepository(ApiToken)
    private apiTokenRepository: Repository<ApiToken>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async generateJwtToken(userId: number, expiresAt: Date): Promise<ApiToken> {
    // old expired tokens
    const expiredTokens = await this.apiTokenRepository.find({
      where: { userId, expiresAt: LessThan(new Date()) },
    })

    // delete expired token
    if (expiredTokens.length > 0) {
      this.apiTokenRepository.remove(expiredTokens)
    }

    // return new token
    return await this.apiTokenRepository.save(
      this.apiTokenRepository.create({
        userId,
        name: 'JWT Token',
        type: 'api',
        token: randomBytes(32).toString('hex'),
        expiresAt: expiresAt || DateTime.now().plus({ days: 60 }).toJSDate(),
      }),
    )
  }

  async verifyTokenAndPermissions(
    token: string,
    permissions: string[] = [],
  ): Promise<{
    error: boolean
    message?: string
    code?: string
    user: User | null
  }> {
    const data = await this.apiTokenRepository.findOne({
      where: { token: token ?? null },
    })

    if (!data) {
      return {
        error: true,
        message: 'Token not found',
        code: 'invalid_token',
        user: null,
      }
    }

    // check if token is expired
    if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
      // delete the token if it is expired
      this.apiTokenRepository.delete(data.id)

      // return false
      return {
        error: true,
        message: 'Token expired',
        code: 'token_expired',
        user: null,
      }
    }

    // get user
    const user = await this.userRepository.findOne({
      where: { id: data.userId },
      relations: ['roles', 'roles.permissions'],
    })

    const allPermissions = user.roles.reduce((acc, role) => {
      return [...acc, ...role.permissions.map((p) => p.slug)]
    }, [])

    user.permissions = Array.from(new Set(allPermissions))
    user.roles = user.roles.map((role) => {
      delete role.permissions
      return role
    })

    // verify permissions
    if (permissions.length > 0) {
      const hasPermission = permissions.some((p) => allPermissions.includes(p))

      if (!hasPermission) {
        return {
          error: true,
          message: 'Permission denied',
          code: 'permission_denied',
          user: null,
        }
      }
    }

    if (!user) {
      return {
        error: true,
        message: 'User not found',
        code: 'user_not_found',
        user: null,
      }
    } else {
      return {
        error: false,
        message: 'User found',
        code: 'user_found',
        user,
      }
    }
  }
}
