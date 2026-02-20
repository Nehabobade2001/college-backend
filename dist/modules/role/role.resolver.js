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
exports.RoleResolver = void 0;
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const CurrentUser_1 = require("../../common/decorators/CurrentUser");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const Role_1 = require("../../entities/Role");
const User_1 = require("../../entities/User");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const role_dto_1 = require("./role.dto");
const role_service_1 = require("./role.service");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let RoleResolver = class RoleResolver {
    constructor(role) {
        this.role = role;
        this.roleService = role;
    }
    async paginatedRoles(listInputDTO) {
        const paginationResult = await this.roleService.listWithPagination(listInputDTO);
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
    async createRole(data, user) {
        return await this.roleService.create(data, user);
    }
    async findRoleById(id) {
        return await this.roleService.findById(id);
    }
    async updateRole(data, user) {
        return await this.roleService.update(data, user);
    }
    async deleteRole(ids) {
        await this.roleService.remove(ids);
        return true;
    }
    async hardDeleteRole(ids) {
        await this.roleService.hardDelete(ids);
        return true;
    }
    async assignPermissionsToRole(roleId, permissionIds) {
        return this.roleService.assignAllPermissionsToRole(roleId, permissionIds);
    }
    async restoreRole(ids, authUser) {
        await this.roleService.restore(ids, authUser);
        return true;
    }
    async changeRoleStatus(data) {
        const roles = await this.roleService.enableRole(data);
        if (!roles.length || roles.some((r) => !r || !r.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ROLE_NOT_FOUND);
        }
        return roles.length === 1 ? roles[0] : { data: roles };
    }
    async listTrashedRoles(listInputDTO) {
        const paginationResult = await this.roleService.listTrashedWithPagination(listInputDTO);
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
    async resolveReference(reference) {
        return await this.roleService.findById(reference.id);
    }
};
exports.RoleResolver = RoleResolver;
__decorate([
    (0, graphql_1.Query)(() => Role_1.PaginatedRoles),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Role:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "paginatedRoles", null);
__decorate([
    (0, graphql_1.Mutation)(() => Role_1.Role),
    (0, PermissionDecorator_1.Permissions)('MasterApp:User:Create'),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.CreateRoleDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "createRole", null);
__decorate([
    (0, graphql_1.Query)(() => Role_1.Role),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Role:Read'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "findRoleById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Role_1.Role),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Role:Update'),
    __param(0, (0, graphql_1.Args)('data')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.UpdateRoleDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "updateRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Role:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "deleteRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Role:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "hardDeleteRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => Role_1.Role),
    __param(0, (0, graphql_1.Args)('roleId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('permissionIds', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "assignPermissionsToRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Role:Restore'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, User_1.User]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "restoreRole", null);
__decorate([
    (0, graphql_1.Mutation)(() => Role_1.RoleUnion),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Role:Action'),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_dto_1.RoleStatusDto]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "changeRoleStatus", null);
__decorate([
    (0, graphql_1.Query)(() => Role_1.PaginatedRoles),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Role:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "listTrashedRoles", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RoleResolver.prototype, "resolveReference", null);
exports.RoleResolver = RoleResolver = __decorate([
    (0, graphql_1.Resolver)(() => Role_1.Role),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RoleResolver);
//# sourceMappingURL=role.resolver.js.map