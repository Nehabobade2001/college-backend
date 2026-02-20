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
exports.ProjectController = void 0;
const withPagination_1 = require("../../common/paginationDto/withPagination");
const common_1 = require("@nestjs/common");
const project_service_1 = require("./project.service");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    async allPaginatedProjects(listInputDTO) {
        try {
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
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Failed to fetch project: ${error.message}`);
        }
    }
    async getProjectById(id) {
        try {
            return await this.projectService.findById(id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException(`Failed to fetch project: ${error.message}`);
        }
    }
};
exports.ProjectController = ProjectController;
__decorate([
    (0, common_1.Post)('list'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "allPaginatedProjects", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectById", null);
exports.ProjectController = ProjectController = __decorate([
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
//# sourceMappingURL=project.controller.js.map