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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const Roles_decorator_1 = require("../decorators/Roles.decorator");
const GraphQLErrorHandling_1 = require("../helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../const/ErrorCodes");
const typeorm_1 = require("@nestjs/typeorm");
const User_1 = require("../../entities/User");
const typeorm_2 = require("typeorm");
let RolesGuard = class RolesGuard {
    constructor(reflector, userRepository) {
        this.reflector = reflector;
        this.userRepository = userRepository;
    }
    async canActivate(context) {
        const requiredRoles = this.reflector.getAllAndOverride(Roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.UNAUTHORIZED);
        }
        const userWithRoles = await this.userRepository.findOne({
            where: { id: user.sub },
            relations: ['roles'],
        });
        if (!userWithRoles) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND);
        }
        const hasRole = userWithRoles.roles.some((role) => requiredRoles.includes(role.name));
        if (!hasRole) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.FORBIDDEN);
        }
        return true;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [core_1.Reflector,
        typeorm_2.Repository])
], RolesGuard);
//# sourceMappingURL=roles.guard.js.map