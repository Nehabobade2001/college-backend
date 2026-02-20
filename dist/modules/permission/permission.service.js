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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const Permissions_1 = require("../../entities/Permissions");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const slugify_1 = __importDefault(require("slugify"));
const typeorm_2 = require("typeorm");
const permission_dto_1 = require("./permission.dto");
const nestjs_paginate_1 = require("nestjs-paginate");
let PermissionService = class PermissionService {
    constructor(permissionRepository) {
        this.permissionRepository = permissionRepository;
    }
    async create(permissionData) {
        const queryRunner = this.permissionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const permission = manager.create(Permissions_1.Permissions, {
                ...permissionData,
                appName: permission_dto_1.appName[permissionData.appName].replace(/\b\w/g, (char) => char.toUpperCase()),
                groupName: 'Default',
                module: permissionData.module.replace(/\b\w/g, (char) => char.toUpperCase()),
                action: permissionData.action.replace(/\b\w/g, (char) => char.toUpperCase()),
                slug: (0, slugify_1.default)(`${permission_dto_1.appName[permissionData.appName]}:${permissionData.module}:${permissionData.action}`.replace(/\b\w/g, (char) => char.toUpperCase())),
            });
            const savedPermission = await manager.save(permission);
            await queryRunner.commitTransaction();
            return savedPermission;
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
        return (0, nestjs_paginate_1.paginate)(query, this.permissionRepository, {
            defaultSortBy: [['createdAt', 'DESC']],
            defaultLimit: limit,
            maxLimit: 50,
            sortableColumns: ['id', 'slug', 'module', 'action', 'createdAt'],
            filterableColumns: {
                slug: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                module: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                action: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['slug', 'module', 'action'],
        });
    }
    async findAll() {
        const queryRunner = this.permissionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const permissions = await manager.find(Permissions_1.Permissions, {});
            if (!permissions || permissions.length === 0) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PERMISSIONS_NOT_FOUND);
            }
            const formattedPermissions = {
                apps: [],
            };
            const appMap = {};
            permissions.forEach((permission) => {
                const { appName, module, action, description, slug, id } = permission;
                if (!appMap[appName]) {
                    appMap[appName] = { appName, modules: {} };
                }
                if (!appMap[appName].modules[module]) {
                    appMap[appName].modules[module] = {
                        name: module,
                        permissions: [],
                    };
                }
                appMap[appName].modules[module].permissions.push({
                    id,
                    module,
                    action,
                    description,
                    slug,
                });
            });
            console.log('formattedPermissions', JSON.stringify(formattedPermissions, null, 2));
            formattedPermissions.apps = Object.values(appMap).map((app) => ({
                appName: app.appName,
                modules: Object.values(app.modules),
            }));
            await queryRunner.commitTransaction();
            return formattedPermissions;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findById(id) {
        const queryRunner = this.permissionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const permission = await manager.findOne(Permissions_1.Permissions, {
                where: { id: id ?? null },
            });
            if (!permission) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PERMISSIONS_NOT_FOUND);
            }
            await queryRunner.commitTransaction();
            return permission;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(id, permissionData) {
        const queryRunner = this.permissionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const permission = await manager.findOne(Permissions_1.Permissions, {
                where: { id: id ?? null },
            });
            if (!permission) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PERMISSIONS_NOT_FOUND);
            }
            const newPermission = await manager.save(manager.merge(Permissions_1.Permissions, permission, {
                ...permissionData,
                appName: permission_dto_1.appName[permissionData.appName].replace(/\b\w/g, (char) => char.toUpperCase()),
                groupName: 'Default',
                module: permissionData.module.replace(/\b\w/g, (char) => char.toUpperCase()),
                action: permissionData.action.replace(/\b\w/g, (char) => char.toUpperCase()),
                slug: (0, slugify_1.default)(`${permission_dto_1.appName[permissionData.appName]}:${permissionData.module}:${permissionData.action}`.replace(/\b\w/g, (char) => char.toUpperCase())),
            }));
            await queryRunner.commitTransaction();
            return newPermission;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async findPermissionBySlug(slug) {
        const queryRunner = this.permissionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const permission = await manager.findOne(Permissions_1.Permissions, {
                where: { slug: slug ?? null },
            });
            if (!permission) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PERMISSIONS_NOT_FOUND);
            }
            await queryRunner.commitTransaction();
            return permission;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async remove(id) {
        const queryRunner = this.permissionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            await manager.softDelete(Permissions_1.Permissions, id);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async groupByPermission() {
        const queryRunner = this.permissionRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const permissions = await manager.find(Permissions_1.Permissions);
            if (!permissions) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PERMISSIONS_NOT_FOUND);
            }
            const modules = [];
            permissions.forEach((permission) => {
                const moduleIndex = modules.findIndex((module) => module.name === permission.module);
                if (moduleIndex === -1) {
                    modules.push({
                        name: permission.module,
                        groups: [
                            {
                                name: permission.groupName,
                                permissions: [permission],
                            },
                        ],
                    });
                }
                else {
                    const groupIndex = modules[moduleIndex].groups.findIndex((group) => group.name === permission.groupName);
                    if (groupIndex === -1) {
                        modules[moduleIndex].groups.push({
                            name: permission.groupName,
                            permissions: [permission],
                        });
                    }
                    else {
                        modules[moduleIndex].groups[groupIndex].permissions.push(permission);
                    }
                }
            });
            await queryRunner.commitTransaction();
            return { modules };
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
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Permissions_1.Permissions)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionService);
//# sourceMappingURL=permission.service.js.map