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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const GraphQLErrorHandling_1 = require("../helpers/GraphQLErrorHandling");
const apiToken_service_1 = require("../../modules/auth/apiToken.service");
const PermissionDecorator_1 = require("../decorators/PermissionDecorator");
const ErrorCodes_1 = require("../const/ErrorCodes");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, jwtService, apiTokenService) {
        super();
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.apiTokenService = apiTokenService;
    }
    async canActivate(context) {
        try {
            let req;
            let gqlContext = null;
            if (context.getType() === 'http') {
                req = context.switchToHttp().getRequest();
            }
            else {
                const gqlExecutionContext = graphql_1.GqlExecutionContext.create(context);
                gqlContext = gqlExecutionContext.getContext();
                const gqlArgs = gqlExecutionContext.getArgs();
                req = gqlContext?.req ?? {};
                req.body = { ...req.body, ...gqlArgs };
            }
            const authHeader = req.headers?.authorization;
            if (!authHeader) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.UNAUTHORIZED);
            }
            const token = authHeader.split(' ')[1];
            const decoded = this.jwtService.verify(token, {
                secret: process.env.JWT_SECRET_KEY,
            });
            const requiredPermissions = this.reflector.getAllAndOverride(PermissionDecorator_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
            const isValid = await this.apiTokenService.verifyTokenAndPermissions(decoded.tokenId, requiredPermissions);
            if (!isValid) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.UNAUTHORIZED);
            }
            req.user = decoded;
            if (gqlContext) {
                gqlContext.user = decoded;
            }
            return true;
        }
        catch (error) {
            if (process.env.NODE_ENV !== 'production')
                console.error('WT Guard Error', error);
            throw error;
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        apiToken_service_1.ApiTokenService])
], JwtAuthGuard);
//# sourceMappingURL=jwt.guard.js.map