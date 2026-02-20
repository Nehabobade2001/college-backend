/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { throwGqlError } from '../helpers/GraphQLErrorHandling'
import { ApiTokenService } from '@/modules/auth/apiToken.service'
import { PERMISSIONS_KEY } from '../decorators/PermissionDecorator'
import { ErrorCodes } from '../const/ErrorCodes'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private apiTokenService: ApiTokenService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      let req: any
      let gqlContext: any = null

      // Handle HTTP and GraphQL context
      if (context.getType() === 'http') {
        req = context.switchToHttp().getRequest()
      } else {
        const gqlExecutionContext = GqlExecutionContext.create(context)
        gqlContext = gqlExecutionContext.getContext()
        const gqlArgs = gqlExecutionContext.getArgs()

        req = gqlContext?.req ?? {}
        req.body = { ...req.body, ...gqlArgs }
      }

      const authHeader: string | undefined = req.headers?.authorization

      if (!authHeader) {
        // throw graphql error
        throwGqlError(ErrorCodes.UNAUTHORIZED)
      }
      const token = authHeader.split(' ')[1]

      // verify token
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      })

      // Check if permissions are required
      const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
        PERMISSIONS_KEY,
        [context.getHandler(), context.getClass()],
      )

      const isValid = await this.apiTokenService.verifyTokenAndPermissions(
        decoded.tokenId,
        requiredPermissions,
      )

      if (!isValid) {
        // throw graphql error
        throwGqlError(ErrorCodes.UNAUTHORIZED)
      }

      // set user to context
      req.user = decoded

      if (gqlContext) {
        gqlContext.user = decoded
      }

      return true

      // console.log('decoded', decoded)
    } catch (error) {
      if (process.env.NODE_ENV !== 'production')
        console.error('WT Guard Error', error)

      // throw graphql error
      throw error
    }
  }
}
