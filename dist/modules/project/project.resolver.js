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
exports.ProjectResolver = void 0;
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const Project_1 = require("../../entities/Project");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const project_dto_1 = require("./project.dto");
const project_service_1 = require("./project.service");
const User_1 = require("../../entities/User");
const CurrentUser_1 = require("../../common/decorators/CurrentUser");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let ProjectResolver = class ProjectResolver {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async resolveReference(reference) {
        return await this.projectService.findById(reference.id);
    }
    async createProject(createProjectInput, currentUser) {
        return this.projectService.create(createProjectInput, currentUser);
    }
    async paginatedProjects(listInputDTO) {
        const paginationResult = await this.projectService.listWithPagination(listInputDTO);
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
    async project(id) {
        return this.projectService.findById(id);
    }
    async updateProject(updateProjectInput, currentUser) {
        return this.projectService.update(updateProjectInput, currentUser);
    }
    async deleteProject(ids) {
        return this.projectService.delete(ids);
    }
    async enableProjectStatus(data) {
        const projects = await this.projectService.enableProject(data);
        if (!projects.length || projects.some((p) => !p || !p.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PROJECT_NOT_FOUND);
        }
        return projects.length === 1 ? projects[0] : { data: projects };
    }
    async hardDeleteProject(ids) {
        await this.projectService.hardDelete(ids);
        return true;
    }
    async restoreProject(ids) {
        await this.projectService.restore(ids);
        return true;
    }
    async listTrashedProjects(listInputDTO) {
        const paginationResult = await this.projectService.listTrashedWithPagination(listInputDTO);
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
exports.ProjectResolver = ProjectResolver;
__decorate([
    (0, graphql_1.ResolveReference)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "resolveReference", null);
__decorate([
    (0, graphql_1.Mutation)(() => Project_1.Project),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Create'),
    __param(0, (0, graphql_1.Args)('createProjectInput')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.CreateProjectDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "createProject", null);
__decorate([
    (0, graphql_1.Query)(() => Project_1.PaginatedProjects),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "paginatedProjects", null);
__decorate([
    (0, graphql_1.Query)(() => Project_1.Project),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Read'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    (0, graphql_1.Mutation)(() => Project_1.Project),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Update'),
    __param(0, (0, graphql_1.Args)('updateProjectInput')),
    __param(1, (0, CurrentUser_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.UpdateProjectDto,
        User_1.User]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "updateProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "deleteProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => Project_1.ProjectUnion),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Update'),
    __param(0, (0, graphql_1.Args)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectStatusDto]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "enableProjectStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "hardDeleteProject", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Update'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "restoreProject", null);
__decorate([
    (0, graphql_1.Query)(() => Project_1.PaginatedProjects),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Project:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "listTrashedProjects", null);
exports.ProjectResolver = ProjectResolver = __decorate([
    (0, graphql_1.Resolver)(() => Project_1.Project),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectResolver);
//# sourceMappingURL=project.resolver.js.map