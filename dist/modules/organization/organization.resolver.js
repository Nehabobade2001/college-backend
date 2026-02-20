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
exports.OrganizationResolver = void 0;
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const Organization_1 = require("../../entities/Organization");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const organization_dto_1 = require("./organization.dto");
const organization_service_1 = require("./organization.service");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let OrganizationResolver = class OrganizationResolver {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async createOrganization(createOrganizationInput) {
        return this.organizationService.create(createOrganizationInput);
    }
    async paginatedOrganization(listInputDTO) {
        const paginationResult = await this.organizationService.listWithPagination(listInputDTO);
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
    async findOrganizationById(id) {
        return this.organizationService.findById(id);
    }
    async updateOrganization(updateOrganizationInput) {
        return this.organizationService.update(updateOrganizationInput);
    }
    async deleteOrganization(ids) {
        return this.organizationService.delete(ids);
    }
    async enableOrganizationStatus(data) {
        const organizations = await this.organizationService.enableOrganization(data);
        if (!organizations.length || organizations.some((o) => !o || !o.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_NOT_FOUND);
        }
        return organizations.length === 1
            ? organizations[0]
            : { data: organizations };
    }
    async hardDeleteOrganization(ids) {
        return this.organizationService.hardDelete(ids);
    }
    async restoreOrganization(ids) {
        await this.organizationService.restore(ids);
        return true;
    }
    async listTrashedOrganizations(listInputDTO) {
        const paginationResult = await this.organizationService.listTrashedWithPagination(listInputDTO);
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
        return await this.organizationService.findById(reference.id);
    }
};
exports.OrganizationResolver = OrganizationResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Organization_1.Organization),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Create'),
    __param(0, (0, graphql_1.Args)('createOrganizationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.CreateOrganizationDto]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "createOrganization", null);
__decorate([
    (0, graphql_1.Query)(() => Organization_1.PaginatedOrganizations),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "paginatedOrganization", null);
__decorate([
    (0, graphql_1.Query)(() => Organization_1.Organization),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Read'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "findOrganizationById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Organization_1.Organization),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Update'),
    __param(0, (0, graphql_1.Args)('updateOrganizationInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.UpdateOrganizationDto]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "updateOrganization", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "deleteOrganization", null);
__decorate([
    (0, graphql_1.Mutation)(() => Organization_1.OrganizationUnion),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Update'),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [organization_dto_1.OrganizationStatusDto]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "enableOrganizationStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "hardDeleteOrganization", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Update'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "restoreOrganization", null);
__decorate([
    (0, graphql_1.Query)(() => Organization_1.PaginatedOrganizations),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Organization:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "listTrashedOrganizations", null);
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationResolver.prototype, "resolveReference", null);
exports.OrganizationResolver = OrganizationResolver = __decorate([
    (0, graphql_1.Resolver)(() => Organization_1.Organization),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationResolver);
//# sourceMappingURL=organization.resolver.js.map