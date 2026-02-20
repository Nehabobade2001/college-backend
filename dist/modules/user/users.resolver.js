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
exports.UsersResolver = void 0;
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const CurrentUser_1 = require("../../common/decorators/CurrentUser");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const User_1 = require("../../entities/User");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const user_dto_1 = require("./user.dto");
const users_service_1 = require("./users.service");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async resolveReference(reference) {
        return await this.usersService.findByIdForRef(reference.id);
    }
    async paginatedUsers(listInputDTO, authUser) {
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
    async createUser(data, authUser) {
        return await this.usersService.create(data, authUser);
    }
    async findUserById(id) {
        return await this.usersService.findById(id);
    }
    async updateUser(data, authUser) {
        return await this.usersService.update(data, authUser);
    }
    async deleteUser(ids, authUser) {
        await this.usersService.remove(ids, authUser);
        return true;
    }
    async assignRoleToUser(userId, roleIds) {
        return this.usersService.assignRoleToUser(userId, roleIds);
    }
    async changePassword(changePasswordData) {
        return this.usersService.changePassword(changePasswordData);
    }
    async updateProfile(data, authUser) {
        return await this.usersService.updateProfile(data, authUser);
    }
    async findPermissionsByUser(id) {
        return await this.usersService.getPermissionsOfUser(id);
    }
    async restoreUser(ids, authUser) {
        await this.usersService.restore(ids, authUser);
        return true;
    }
    async hardDeleteUser(ids, authUser) {
        await this.usersService.hardDelete(ids, authUser);
        return true;
    }
    async trashedUsers(listInputDTO, authUser) {
        const paginationResult = await this.usersService.listTrashedWithPagination(listInputDTO, authUser);
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
    async changeUserStatus(data) {
        const users = await this.usersService.enableUser(data);
        if (!users.length || users.some((u) => !u || !u.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.USER_NOT_FOUND);
        }
        return users.length === 1 ? users[0] : { data: users };
    }
    async userHierarchy(parentId, nameFilter) {
        return this.usersService.getUserHierarchy(parentId, nameFilter);
    }
};
exports.UsersResolver = UsersResolver;
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "resolveReference", null);
__decorate([
    (0, graphql_1.Query)(() => User_1.PaginatedUsers),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO,
        User_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "paginatedUsers", null);
__decorate([
    (0, graphql_1.Mutation)(() => User_1.User),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Create'),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.CreateUserDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Query)(() => User_1.User),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Read'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findUserById", null);
__decorate([
    (0, graphql_1.Mutation)(() => User_1.User),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Update'),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, User_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "deleteUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => User_1.User),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Update', 'MasterApp:Role:Update'),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('roleIds', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "assignRoleToUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Update'),
    __param(0, (0, graphql_1.Args)('changePasswordData')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "changePassword", null);
__decorate([
    (0, graphql_1.Mutation)(() => User_1.User),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Update'),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UpdateUserDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updateProfile", null);
__decorate([
    (0, graphql_1.Query)(() => [String]),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findPermissionsByUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Restore'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, User_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "restoreUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, User_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "hardDeleteUser", null);
__decorate([
    (0, graphql_1.Query)(() => User_1.PaginatedUsers),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO,
        User_1.User]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "trashedUsers", null);
__decorate([
    (0, graphql_1.Mutation)(() => User_1.UserUnion),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Action'),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserStatusDto]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "changeUserStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, graphql_1.Query)(() => [User_1.User]),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Read'),
    __param(0, (0, graphql_1.Args)('parentId', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('nameFilter', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "userHierarchy", null);
exports.UsersResolver = UsersResolver = __decorate([
    (0, graphql_1.Resolver)(() => User_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
//# sourceMappingURL=users.resolver.js.map