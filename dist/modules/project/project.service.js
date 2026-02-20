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
exports.ProjectService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const Project_1 = require("../../entities/Project");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    async create(projectData, currentUser) {
        const queryRunner = this.projectRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const existingProject = await manager.findOne(Project_1.Project, {
                where: {
                    name: projectData.name,
                    organizationId: projectData.organizationId,
                },
            });
            if (existingProject) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PROJECT_NAME_ALREADY_EXISTS, {
                    name: projectData.name,
                });
            }
            const project = manager.create(Project_1.Project, {
                ...projectData,
                createdById: currentUser.id,
                status: 'pending',
            });
            const savedProject = await manager.save(project);
            await queryRunner.commitTransaction();
            return savedProject;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async listWithPagination(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.projectRepository, {
            relations: ['organization', 'createdBy'],
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'name', 'status', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ],
            },
            searchableColumns: ['name', 'status'],
        });
    }
    async findById(id) {
        try {
            const project = await this.projectRepository.findOne({
                where: { id },
                relations: ['organization', 'createdBy'],
            });
            if (!project) {
                throw new common_1.NotFoundException(`Project with ID ${id} not found`);
            }
            return project;
        }
        catch (error) {
            console.error(`Error fetching project by ID ${id}:`, error);
            throw error;
        }
    }
    async update(projectData, currentUser) {
        const queryRunner = this.projectRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const project = await manager.findOne(Project_1.Project, {
                where: { id: projectData.id ?? null },
            });
            if (!project) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PROJECT_NOT_FOUND);
            }
            manager.merge(Project_1.Project, project, {
                ...projectData,
                createdById: currentUser.id,
            });
            const updatedProject = await manager.save(project);
            await queryRunner.commitTransaction();
            return updatedProject;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async delete(ids) {
        const queryRunner = this.projectRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const projects = await manager.find(Project_1.Project, {
                where: idArray.map((id) => ({ id })),
            });
            if (projects) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PROJECT_NOT_FOUND);
            }
            await manager.softDelete(Project_1.Project, ids);
            await queryRunner.commitTransaction();
            return true;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async hardDelete(ids) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const projects = await this.projectRepository.find({
            where: idArray.map((id) => ({ id })),
            withDeleted: true,
        });
        if (projects.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PROJECT_NOT_FOUND);
        }
        if (projects.some((plan) => plan.deletedAt === null)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PROJECT_CAN_NOT_BE_HARD_DELETED);
        }
        await this.projectRepository.delete(ids);
    }
    async restore(ids) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const projects = await this.projectRepository.find({
            where: idArray.map((id) => ({ id })),
            withDeleted: true,
        });
        if (projects.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PROJECT_NOT_FOUND);
        }
        await this.projectRepository.restore(ids);
    }
    async listTrashedWithPagination(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.projectRepository, {
            relations: ['organization', 'createdBy'],
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'name', 'status', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ],
            },
            searchableColumns: ['name', 'status'],
            withDeleted: true,
            where: { deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
        });
    }
    async enableProject(data) {
        const queryRunner = this.projectRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const projects = await manager.find(Project_1.Project, {
                where: idArray.map((id) => ({ id })),
            });
            if (projects.length !== idArray.length ||
                projects.some((p) => !p || !p.id)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PROJECT_NOT_FOUND);
            }
            const updatedProject = await manager.save(projects.map((project) => manager.merge(Project_1.Project, project, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedProject;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.ProjectService = ProjectService;
exports.ProjectService = ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Project_1.Project)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProjectService);
//# sourceMappingURL=project.service.js.map