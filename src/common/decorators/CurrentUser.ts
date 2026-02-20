// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { UsersService } from '@/modules/user/users.service'
// import { createParamDecorator, ExecutionContext } from '@nestjs/common'
// import { ModuleRef } from '@nestjs/core'
// import { GqlExecutionContext } from '@nestjs/graphql'

// export const CurrentUser = createParamDecorator(
//   async (_data: unknown, context: ExecutionContext) => {
//     const ctx = GqlExecutionContext.create(context)
//     const gqlContext = ctx.getContext()

//     const request = gqlContext.req ?? context.switchToHttp().getRequest()

//     const decoded = gqlContext.user ?? request?.user

//     if (!decoded) {
//       console.warn('CurrentUser: decoded user is undefined')
//       return null
//     }

//     const moduleRef: ModuleRef = request.moduleRef
//     const userService = moduleRef.get(UsersService, { strict: false })

//     const user = userService ? await userService.findById(decoded.sub) : decoded

//     return user
//   },
// )

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { UsersService } from '@/modules/user/users.service'
import {
  ContextType,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator(
  async (_data: unknown, context: ExecutionContext) => {
    const isGraphQL = context.getType() === ('graphql' as ContextType)
    const gqlContext = isGraphQL
      ? GqlExecutionContext.create(context).getContext()
      : null
    const request = gqlContext?.req ?? context.switchToHttp().getRequest()

    const decoded = gqlContext?.user ?? request?.user

    if (!decoded) {
      console.warn('CurrentUser: decoded user is undefined')
      return null
    }

    // Attempt to retrieve full user from UsersService if ModuleRef is available
    try {
      const moduleRef: ModuleRef = request.moduleRef
      if (!moduleRef) return decoded

      const userService = moduleRef.get(UsersService, { strict: false })
      const user = userService
        ? await userService.findById(decoded.sub)
        : decoded

      return user
    } catch (err) {
      console.error('CurrentUser: Error retrieving user from ModuleRef', err)
      return decoded
    }
  },
)
