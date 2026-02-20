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
exports.ApplicationModuleResolver = void 0;
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const Module_1 = require("../../entities/Module");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const module_dto_1 = require("./module.dto");
const module_service_1 = require("./module.service");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let ApplicationModuleResolver = class ApplicationModuleResolver {
    constructor(moduleService) {
        this.moduleService = moduleService;
    }
    async createModule(createModuleInput) {
        return this.moduleService.create(createModuleInput);
    }
    async paginatedModules(listInputDTO) {
        const paginationResult = await this.moduleService.listWithPagination(listInputDTO);
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
    async findModuleById(id) {
        return this.moduleService.findById(id);
    }
    async updateModule(updateModuleInput) {
        return this.moduleService.update(updateModuleInput);
    }
    async changeModuleStatus(moduleStatusInput) {
        const modules = await this.moduleService.enableModule(moduleStatusInput);
        if (!modules.length || modules.some((o) => !o || !o.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.MODULE_NOT_FOUND);
        }
        return modules.length === 1 ? modules[0] : { data: modules };
    }
    async deleteModule(ids) {
        return this.moduleService.delete(ids);
    }
    async hardDeleteModule(ids) {
        return this.moduleService.hardDelete(ids);
    }
    async restoreModule(ids) {
        await this.moduleService.restore(ids);
        return true;
    }
    async trashedModules(listInputDTO) {
        const paginationResult = await this.moduleService.listTrashedWithPagination(listInputDTO);
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
};
exports.ApplicationModuleResolver = ApplicationModuleResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Module_1.ApplicationModule),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Create'),
    __param(0, (0, graphql_1.Args)('createModuleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [module_dto_1.CreateModuleDto]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "createModule", null);
__decorate([
    (0, graphql_1.Query)(() => Module_1.PaginatedApplicationModules),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "paginatedModules", null);
__decorate([
    (0, graphql_1.Query)(() => Module_1.ApplicationModule),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Read'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "findModuleById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Module_1.ApplicationModule),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Update'),
    __param(0, (0, graphql_1.Args)('updateModuleInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [module_dto_1.UpdateModuleDto]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "updateModule", null);
__decorate([
    (0, graphql_1.Mutation)(() => Module_1.ApplicationModuleUnion),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Action'),
    __param(0, (0, graphql_1.Args)('updateModuleStatusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [module_dto_1.ModuleStatusDto]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "changeModuleStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "deleteModule", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "hardDeleteModule", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Restore'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "restoreModule", null);
__decorate([
    (0, graphql_1.Query)(() => Module_1.PaginatedApplicationModules),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Module:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], ApplicationModuleResolver.prototype, "trashedModules", null);
exports.ApplicationModuleResolver = ApplicationModuleResolver = __decorate([
    (0, graphql_1.Resolver)(() => Module_1.ApplicationModule),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [module_service_1.ApplicationModuleService])
], ApplicationModuleResolver);
//# sourceMappingURL=module.resolver.js.map