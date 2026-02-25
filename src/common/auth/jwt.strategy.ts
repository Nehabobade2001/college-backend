import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '@/entities/User'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    })
  }

  async validate(payload: { sub: string; username: string }) {
    // Always load fresh user + roles + permissions from DB on every request.
    // This ensures that any role/permission changes made by an admin are
    // reflected immediately without the user having to re-login.
    const user = await this.userRepository.findOne({
      where: { id: Number(payload.sub) },
      relations: ['roles', 'roles.permissions'],
    })

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    return user
  }
}
