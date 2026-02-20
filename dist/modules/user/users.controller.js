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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const CurrentUser_1 = require("../../common/decorators/CurrentUser");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const User_1 = require("../../entities/User");
const apiToken_service_1 = require("../auth/apiToken.service");
const user_dto_1 = require("./user.dto");
let UsersController = class UsersController {
    constructor(usersService, apiTokenService) {
        this.usersService = usersService;
        this.apiTokenService = apiTokenService;
    }
    async getUserById(id) {
        return this.usersService.findById(id);
    }
    async getAllUsers(listInputDTO, authUser) {
        if (!authUser || !authUser.id) {
            throw new common_1.UnauthorizedException('Invalid or missing user in context');
        }
        const paginationResult = await this.usersService.listWithPagination(listInputDTO, authUser);
        return {
            data: paginationResult.data,
            meta: {
                totalItems: paginationResult.meta.totalItems,
                totalPages: paginationResult.meta.totalPages,
                currentPage: paginationResult.meta.currentPage,
                limit: paginationResult.meta.itemsPerPage,
            },
        };
    }
    async userHierarchy(parentId, nameFilter) {
        return this.usersService.getUserHierarchy(parentId, nameFilter);
    }
    async createUser(user, _authUser) {
        return this.usersService.create(user, _authUser);
    }
    async validateToken(tokenId, permissions) {
        try {
            const isValid = await this.apiTokenService.verifyTokenAndPermissions(tokenId, permissions);
            return isValid;
        }
        catch (error) {
            console.error('error', error);
            return {
                error: true,
                message: 'Internal server error',
                code: 'INTERNAL_SERVER_ERROR',
                user: null,
            };
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Read'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUserById", null);
__decorate([
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Read'),
    (0, common_1.Post)('all'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO,
        User_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Read'),
    (0, common_1.Post)('user-hierarchy'),
    __param(0, (0, common_1.Body)('parentId')),
    __param(1, (0, common_1.Body)('nameFilter')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userHierarchy", null);
__decorate([
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Create'),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)('tokenId')),
    __param(1, (0, common_1.Body)('permissions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "validateToken", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        apiToken_service_1.ApiTokenService])
], UsersController);
//# sourceMappingURL=users.controller.js.map