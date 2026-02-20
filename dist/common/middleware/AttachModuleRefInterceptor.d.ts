import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Observable } from 'rxjs';
export declare class AttachModuleRefInterceptor implements NestInterceptor {
    private readonly moduleRef;
    constructor(moduleRef: ModuleRef);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
