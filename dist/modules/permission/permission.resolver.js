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
exports.PermissionResolver = void 0;
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const Permissions_1 = require("../../entities/Permissions");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const permission_dto_1 = require("./permission.dto");
const permission_service_1 = require("./permission.service");
let PermissionResolver = class PermissionResolver {
    constructor(permission) {
        this.permission = permission;
        this.permissionService = permission;
    }
    async allPermissions() {
        const per = await this.permissionService.findAll();
        return per;
    }
    async paginatedPermissions(listInputDTO) {
        const paginationResult = await this.permissionService.listWithPagination(listInputDTO);
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
    async createPermission(data) {
        return await this.permissionService.create(data);
    }
    async findPermissionById(id) {
        return await this.permissionService.findById(id);
    }
    async updatePermission(data) {
        return await this.permissionService.update(data.id, data);
    }
    async deletePermission(id) {
        await this.permissionService.remove(id);
        return true;
    }
    async permissionGroup() {
        return await this.permissionService.groupByPermission();
    }
    async resolveReference(reference) {
        return await this.permissionService.findById(reference.id);
    }
};
exports.PermissionResolver = PermissionResolver;
__decorate([
    (0, graphql_1.Query)(() => permission_dto_1.DynamicPermissionsDto),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "allPermissions", null);
__decorate([
    (0, graphql_1.Query)(() => Permissions_1.PaginatedPermissions),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "paginatedPermissions", null);
__decorate([
    (0, graphql_1.Mutation)(() => Permissions_1.Permissions),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.CreatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "createPermission", null);
__decorate([
    (0, graphql_1.Query)(() => Permissions_1.Permissions),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "findPermissionById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Permissions_1.Permissions),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [permission_dto_1.UpdatePermissionDto]),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "updatePermission", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "deletePermission", null);
__decorate([
    (0, graphql_1.Query)(() => permission_dto_1.PermissionGroup),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "permissionGroup", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PermissionResolver.prototype, "resolveReference", null);
exports.PermissionResolver = PermissionResolver = __decorate([
    (0, graphql_1.Resolver)(() => Permissions_1.Permissions),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionResolver);
//# sourceMappingURL=permission.resolver.js.map