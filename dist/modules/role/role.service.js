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
exports.RoleService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const Permissions_1 = require("../../entities/Permissions");
const Role_1 = require("../../entities/Role");
const UserRole_1 = require("../../entities/UserRole");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
let RoleService = class RoleService {
    constructor(roleRepository) {
        this.roleRepository = roleRepository;
    }
    async create(roleData, authUser) {
        const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const permissions = await manager.find(Permissions_1.Permissions, {
                where: {
                    id: (0, typeorm_2.In)(roleData.permissionIds),
                },
            });
            if (!permissions) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PERMISSIONS_NOT_FOUND);
            }
            const role = manager.create(Role_1.Role, {
                ...roleData,
                isPrimary: false,
                organizationId: authUser.organizationId,
                status: 'active',
            });
            role.permissions = permissions;
            const savedRole = await manager.save(role);
            await queryRunner.commitTransaction();
            return savedRole;
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
        const qb = this.roleRepository
            .createQueryBuilder('role')
            .loadRelationCountAndMap('role.permissionCount', 'role.permissions')
            .where('role.isPrimary = false');
        return (0, nestjs_paginate_1.paginate)(query, qb, {
            defaultLimit: 10,
            maxLimit: 50,
            defaultSortBy: [['createdAt', 'DESC']],
            sortableColumns: ['id', 'name', 'roleType', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                roleType: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['name', 'roleType'],
            where: { deletedAt: (0, typeorm_2.IsNull)() },
        });
    }
    async findById(id) {
        const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const role = await manager.findOne(Role_1.Role, {
                where: { id: id ?? null },
                relations: ['permissions'],
            });
            if (!role) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_ROLE);
            }
            role.permissionCount = role.permissions.length;
            await queryRunner.commitTransaction();
            return role;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(roleData, _authUser) {
        const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const permissions = await manager.find(Permissions_1.Permissions, {
                where: {
                    id: (0, typeorm_2.In)(roleData.permissionIds),
                },
            });
            if (!permissions) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PERMISSIONS_NOT_FOUND);
            }
            const role = await manager.findOne(Role_1.Role, {
                where: { id: roleData.id ?? null },
            });
            if (!role) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_ROLE);
            }
            const newRole = manager.create(Role_1.Role, {
                ...role,
                ...roleData,
                isPrimary: false,
                organizationId: _authUser.organizationId,
            });
            newRole.permissions = permissions;
            const savedRole = await manager.save(newRole);
            await queryRunner.commitTransaction();
            return savedRole;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(ids) {
        const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const role = await manager
                .createQueryBuilder(Role_1.Role, 'role')
                .where('role.id IN (:...ids)', { ids: idArray })
                .getMany();
            if (role.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_ROLE);
            }
            if (role.some((ro) => ro.isPrimary)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.CANNOT_DELETE_PRIMARY_ROLE);
            }
            const user = await manager.find(UserRole_1.UserRole, {
                where: { roleId: (0, typeorm_2.In)(role.map((r) => r.id)) },
            });
            if (user.length !== 0) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ROLE_ASSIGNED_TO_USER);
            }
            await queryRunner.commitTransaction();
            await manager.softDelete(Role_1.Role, ids);
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
        const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const role = await manager.find(Role_1.Role, {
                where: idArray.map((id) => ({ id })),
                withDeleted: true,
            });
            if (role.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_ROLE);
            }
            if (role.some((ro) => ro.isPrimary)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.CANNOT_DELETE_PRIMARY_ROLE);
            }
            await queryRunner.commitTransaction();
            await manager.delete(Role_1.Role, ids);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async restore(ids, _authUser) {
        const idArray = Array.isArray(ids) ? ids : [ids];
        const user = await this.roleRepository.find({
            where: {
                id: (0, typeorm_2.In)(idArray),
                organizationId: _authUser.organizationId,
            },
            withDeleted: true,
        });
        if (!user) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ROLE_NOT_FOUND);
        }
        await this.roleRepository.restore(ids);
    }
    async listTrashedWithPagination(query) {
        const qb = this.roleRepository
            .createQueryBuilder('role')
            .loadRelationCountAndMap('role.permissionCount', 'role.permissions')
            .where('role.isPrimary = false & role.deletedAt IS NOT NULL');
        return (0, nestjs_paginate_1.paginate)(query, qb, {
            defaultLimit: 10,
            maxLimit: 50,
            defaultSortBy: [['createdAt', 'DESC']],
            sortableColumns: ['id', 'name', 'roleType', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                roleType: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['name', 'roleType'],
            withDeleted: true,
        });
    }
    async enableRole(data) {
        const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const roles = await manager.find(Role_1.Role, {
                where: idArray.map((id) => ({ id })),
            });
            if (roles.length !== idArray.length || roles.some((p) => !p || !p.id)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ROLE_NOT_FOUND);
            }
            const updatedRole = await manager.save(roles.map((role) => manager.merge(Role_1.Role, role, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedRole;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async assignAllPermissionsToRole(roleId, permissionIds) {
        const queryRunner = this.roleRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const role = await manager.findOne(Role_1.Role, {
                where: { id: roleId },
                relations: ['permissions'],
            });
            if (!role) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.INVALID_ROLE);
            }
            const allPermissions = await manager.find(Permissions_1.Permissions, {
                where: {
                    id: (0, typeorm_2.In)(permissionIds),
                },
            });
            if (!allPermissions) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PERMISSIONS_NOT_FOUND);
            }
            role.permissions = allPermissions;
            const savedRole = await manager.save(role);
            await queryRunner.commitTransaction();
            return savedRole;
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
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Role_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RoleService);
//# sourceMappingURL=role.service.js.map