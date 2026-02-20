/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { Observable } from 'rxjs'

@Injectable()
export class AttachModuleRefInterceptor implements NestInterceptor {
  constructor(private readonly moduleRef: ModuleRef) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let request: any

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest()
    } else if (context.getType<GqlContextType>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context)
      request = gqlContext.getContext().req
    }

    // Only attach if request exists
    if (request) {
      request.moduleRef = this.moduleRef
    }

    return next.handle()
  }
}
