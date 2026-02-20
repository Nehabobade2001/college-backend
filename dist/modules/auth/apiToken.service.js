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
exports.ApiTokenService = void 0;
const ApiToken_1 = require("../../entities/ApiToken");
const User_1 = require("../../entities/User");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const luxon_1 = require("luxon");
const typeorm_2 = require("typeorm");
let ApiTokenService = class ApiTokenService {
    constructor(apiTokenRepository, userRepository) {
        this.apiTokenRepository = apiTokenRepository;
        this.userRepository = userRepository;
    }
    async generateJwtToken(userId, expiresAt) {
        const expiredTokens = await this.apiTokenRepository.find({
            where: { userId, expiresAt: (0, typeorm_2.LessThan)(new Date()) },
        });
        if (expiredTokens.length > 0) {
            this.apiTokenRepository.remove(expiredTokens);
        }
        return await this.apiTokenRepository.save(this.apiTokenRepository.create({
            userId,
            name: 'JWT Token',
            type: 'api',
            token: (0, crypto_1.randomBytes)(32).toString('hex'),
            expiresAt: expiresAt || luxon_1.DateTime.now().plus({ days: 60 }).toJSDate(),
        }));
    }
    async verifyTokenAndPermissions(token, permissions = []) {
        const data = await this.apiTokenRepository.findOne({
            where: { token: token ?? null },
        });
        if (!data) {
            return {
                error: true,
                message: 'Token not found',
                code: 'invalid_token',
                user: null,
            };
        }
        if (data.expiresAt && new Date(data.expiresAt) < new Date()) {
            this.apiTokenRepository.delete(data.id);
            return {
                error: true,
                message: 'Token expired',
                code: 'token_expired',
                user: null,
            };
        }
        const user = await this.userRepository.findOne({
            where: { id: data.userId },
            relations: ['roles', 'roles.permissions'],
        });
        const allPermissions = user.roles.reduce((acc, role) => {
            return [...acc, ...role.permissions.map((p) => p.slug)];
        }, []);
        user.permissions = Array.from(new Set(allPermissions));
        user.roles = user.roles.map((role) => {
            delete role.permissions;
            return role;
        });
        if (permissions.length > 0) {
            const hasPermission = permissions.some((p) => allPermissions.includes(p));
            if (!hasPermission) {
                return {
                    error: true,
                    message: 'Permission denied',
                    code: 'permission_denied',
                    user: null,
                };
            }
        }
        if (!user) {
            return {
                error: true,
                message: 'User not found',
                code: 'user_not_found',
                user: null,
            };
        }
        else {
            return {
                error: false,
                message: 'User found',
                code: 'user_found',
                user,
            };
        }
    }
};
exports.ApiTokenService = ApiTokenService;
exports.ApiTokenService = ApiTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ApiToken_1.ApiToken)),
    __param(1, (0, typeorm_1.InjectRepository)(User_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ApiTokenService);
//# sourceMappingURL=apiToken.service.js.map