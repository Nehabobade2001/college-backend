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
exports.OrganizationService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const Organization_1 = require("../../entities/Organization");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
let OrganizationService = class OrganizationService {
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
    }
    async create(organizationData) {
        const queryRunner = this.organizationRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const organization = manager.create(Organization_1.Organization, {
                ...organizationData,
                status: 'pending',
            });
            const savedOrganization = await manager.save(organization);
            await queryRunner.commitTransaction();
            return savedOrganization;
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
        const limit = Math.min(query.limit ?? 50, 50);
        return (0, nestjs_paginate_1.paginate)(query, this.organizationRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'name', 'status', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['name', 'status'],
        });
    }
    async findById(id) {
        try {
            const organization = await this.organizationRepository.findOne({
                where: { id },
            });
            if (!organization) {
                throw new common_1.NotFoundException(`organization with ID ${id} not found`);
            }
            return organization;
        }
        catch (error) {
            console.error(`Error fetching organization by ID ${id}:`, error);
            throw error;
        }
    }
    async update(organizationData) {
        const queryRunner = this.organizationRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const organization = await manager.findOne(Organization_1.Organization, {
                where: { id: organizationData.id ?? null },
            });
            if (!organization) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_NOT_FOUND);
            }
            manager.merge(Organization_1.Organization, organization, organizationData);
            const savedOrganization = await manager.save(organization);
            await queryRunner.commitTransaction();
            return savedOrganization;
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
        const queryRunner = this.organizationRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const organizations = await manager.find(Organization_1.Organization, {
                where: idArray.map((id) => ({ id })),
            });
            if (organizations.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_NOT_FOUND);
            }
            await manager.softDelete(Organization_1.Organization, ids);
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
        const queryRunner = this.organizationRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const organizations = await manager.find(Organization_1.Organization, {
                where: idArray.map((id) => ({ id })),
                withDeleted: true,
            });
            if (organizations.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_NOT_FOUND);
            }
            if (organizations.some((plan) => plan.deletedAt === null)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_CAN_NOT_BE_HARD_DELETED);
            }
            await manager.delete(Organization_1.Organization, ids);
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
    async restore(ids) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const organizations = await this.organizationRepository.find({
            where: idArray.map((id) => ({ id })),
            withDeleted: true,
        });
        if (organizations.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_NOT_FOUND);
        }
        await this.organizationRepository.restore(ids);
    }
    async listTrashedWithPagination(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.organizationRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'name', 'status', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['name', 'status'],
            withDeleted: true,
            where: { deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
        });
    }
    async enableOrganization(data) {
        const queryRunner = this.organizationRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const organizations = await manager.find(Organization_1.Organization, {
                where: idArray.map((id) => ({ id })),
            });
            if (organizations.length !== idArray.length ||
                organizations.some((p) => !p || !p.id)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_NOT_FOUND);
            }
            const updatedOrganization = await manager.save(organizations.map((organization) => manager.merge(Organization_1.Organization, organization, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedOrganization;
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
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Organization_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map