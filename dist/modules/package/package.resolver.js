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
exports.PackageResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const package_dto_1 = require("./package.dto");
const Package_1 = require("../../entities/Package");
const package_service_1 = require("./package.service");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let PackageResolver = class PackageResolver {
    constructor(PackageService) {
        this.PackageService = PackageService;
    }
    async createPackage(createPackageInput) {
        return this.PackageService.create(createPackageInput);
    }
    async paginatedPackages(listInputDTO) {
        const paginationResult = await this.PackageService.listWithPagination(listInputDTO);
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
    async findPackageById(id) {
        return this.PackageService.findById(id);
    }
    async updatePackage(updatePackageInput) {
        return this.PackageService.update(updatePackageInput);
    }
    async changePackageStatus(updatePackageStatusInput) {
        const pkgs = await this.PackageService.enablePackage(updatePackageStatusInput);
        if (!pkgs.length || pkgs.some((o) => !o || !o.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
        }
        return pkgs.length === 1 ? pkgs[0] : { data: pkgs };
    }
    async deletePackage(ids) {
        return this.PackageService.delete(ids);
    }
    async hardDeletePackage(ids) {
        return this.PackageService.hardDelete(ids);
    }
    async restorePackage(ids) {
        await this.PackageService.restore(ids);
        return true;
    }
    async trashedPackages(listInputDTO) {
        const paginationResult = await this.PackageService.listTrashedWithPagination(listInputDTO);
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
    async assignModuleToPkg(packageId, moduleIds) {
        return this.PackageService.assignModuleInPkg(packageId, moduleIds);
    }
    async packagesDropdown(listInputDTO) {
        const paginationResult = await this.PackageService.dropdownPackageList(listInputDTO);
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
exports.PackageResolver = PackageResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Package_1.Package),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Create'),
    __param(0, (0, graphql_1.Args)('createPackageInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [package_dto_1.CreatePackageDto]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "createPackage", null);
__decorate([
    (0, graphql_1.Query)(() => Package_1.PaginatedPackages),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "paginatedPackages", null);
__decorate([
    (0, graphql_1.Query)(() => Package_1.Package),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Read'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "findPackageById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Package_1.Package),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Update'),
    __param(0, (0, graphql_1.Args)('updatePackageInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [package_dto_1.UpdatePackageDto]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "updatePackage", null);
__decorate([
    (0, graphql_1.Mutation)(() => Package_1.PackageUnion),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Action'),
    __param(0, (0, graphql_1.Args)('updatePackageStatusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [package_dto_1.PackageStatusDto]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "changePackageStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "deletePackage", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "hardDeletePackage", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Restore'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "restorePackage", null);
__decorate([
    (0, graphql_1.Query)(() => Package_1.PaginatedPackages),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "trashedPackages", null);
__decorate([
    (0, graphql_1.Mutation)(() => Package_1.Package),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Read', 'MasterApp:Module:Read'),
    __param(0, (0, graphql_1.Args)('packageId', { type: () => graphql_1.Int })),
    __param(1, (0, graphql_1.Args)('moduleIds', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "assignModuleToPkg", null);
__decorate([
    (0, graphql_1.Query)(() => Package_1.PaginatedPackages),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Package:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], PackageResolver.prototype, "packagesDropdown", null);
exports.PackageResolver = PackageResolver = __decorate([
    (0, graphql_1.Resolver)(() => Package_1.Package),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [package_service_1.PackageService])
], PackageResolver);
//# sourceMappingURL=package.resolver.js.map