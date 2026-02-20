"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttachModuleRefInterceptor = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
let AttachModuleRefInterceptor = class AttachModuleRefInterceptor {
    constructor(moduleRef) {
        this.moduleRef = moduleRef;
    }
    intercept(context, next) {
        let request;
        if (context.getType() === 'http') {
            request = context.switchToHttp().getRequest();
        }
        else if (context.getType() === 'graphql') {
            const gqlContext = graphql_1.GqlExecutionContext.create(context);
            request = gqlContext.getContext().req;
        }
        if (request) {
            request.moduleRef = this.moduleRef;
        }
        return next.handle();
    }
};
exports.AttachModuleRefInterceptor = AttachModuleRefInterceptor;
exports.AttachModuleRefInterceptor = AttachModuleRefInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ModuleRef !== "undefined" && core_1.ModuleRef) === "function" ? _a : Object])
], AttachModuleRefInterceptor);
//# sourceMappingURL=AttachModuleRefInterceptor.js.map