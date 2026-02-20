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
exports.PackageService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const Module_1 = require("../../entities/Module");
const Package_1 = require("../../entities/Package");
const PackageModule_1 = require("../../entities/PackageModule");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
const helper_1 = require("../../common/helpers/helper");
let PackageService = class PackageService {
    constructor(PackageRepository) {
        this.PackageRepository = PackageRepository;
    }
    async create(packageData) {
        const queryRunner = this.PackageRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const existingModule = await manager.find(Module_1.ApplicationModule, {
                where: { id: (0, typeorm_2.In)(packageData.moduleIds) },
            });
            switch (true) {
                case !existingModule:
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.MODULE_NOT_FOUND);
                    break;
                case packageData.discountedPrice > packageData.price:
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE);
                    break;
                default:
                    break;
            }
            const pkg = manager.create(Package_1.Package, {
                ...packageData,
                status: 'active',
                modules: existingModule,
            });
            const savedPackage = await manager.save(pkg);
            await queryRunner.commitTransaction();
            return await manager.findOne(Package_1.Package, {
                where: { id: savedPackage.id },
                relations: ['modules'],
            });
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
        return (0, nestjs_paginate_1.paginate)(query, this.PackageRepository, {
            relations: ['modules'],
            defaultSortBy: [['createdAt', 'DESC']],
            defaultLimit: limit,
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
        const queryRunner = this.PackageRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const pkg = await manager.findOne(Package_1.Package, {
                where: { id: id ?? (0, typeorm_2.IsNull)() },
                relations: ['modules'],
            });
            if (!pkg) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
            }
            await queryRunner.commitTransaction();
            return pkg;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(packageData) {
        const queryRunner = this.PackageRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const pkg = await manager.findOne(Package_1.Package, {
                where: { id: packageData.id ?? null },
            });
            if (!pkg) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
            }
            const existingModule = await manager.find(Module_1.ApplicationModule, {
                where: { id: (0, typeorm_2.In)(packageData.moduleIds) },
            });
            if (packageData.offerExpiryDate < (0, helper_1.formatDate)(new Date(), 'yyyy-MM-dd')) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_EXPIRED);
            }
            switch (true) {
                case !existingModule:
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.MODULE_NOT_FOUND);
                    break;
                case packageData.discountedPrice > packageData.price:
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.DISCOUNTED_PRICE_MUST_BE_LESS_THAN_PRICE);
                    break;
                default:
                    break;
            }
            manager.merge(Package_1.Package, pkg, {
                ...packageData,
                modules: existingModule,
            });
            const savedPackage = await manager.save(pkg);
            await queryRunner.commitTransaction();
            const Pack = await manager.findOne(Package_1.Package, {
                where: { id: savedPackage.id },
                relations: ['modules'],
            });
            return Pack;
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
        const queryRunner = this.PackageRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const pkgs = await manager.find(Package_1.Package, {
                where: idArray.map((id) => ({ id })),
            });
            if (pkgs.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
            }
            await manager.softDelete(Package_1.Package, ids);
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
        const queryRunner = this.PackageRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const pkgs = await manager.find(Package_1.Package, {
                where: idArray.map((id) => ({ id })),
                withDeleted: true,
            });
            if (pkgs.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
            }
            if (pkgs.some((plan) => plan.deletedAt === null)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_CAN_NOT_BE_HARD_DELETED);
            }
            await manager.delete(Package_1.Package, ids);
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
        const pkgs = await this.PackageRepository.find({
            where: idArray.map((id) => ({ id })),
            withDeleted: true,
        });
        if (pkgs.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
        }
        await this.PackageRepository.restore(ids);
    }
    async listTrashedWithPagination(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.PackageRepository, {
            relations: ['modules'],
            defaultLimit: limit,
            maxLimit: 50,
            defaultSortBy: [['createdAt', 'DESC']],
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
    async enablePackage(data) {
        const queryRunner = this.PackageRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const pkgs = await manager.find(Package_1.Package, {
                where: idArray.map((id) => ({ id })),
            });
            if (pkgs.length !== idArray.length || pkgs.some((pkg) => pkg.deletedAt)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
            }
            const updatedPackage = await manager.save(pkgs.map((pkg) => manager.merge(Package_1.Package, pkg, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedPackage;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async assignModuleInPkg(packageId, moduleIds) {
        const queryRunner = this.PackageRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const manager = queryRunner.manager;
            const pkg = await manager.findOne(Package_1.Package, { where: { id: packageId } });
            if (!pkg) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.PACKAGE_NOT_FOUND);
            }
            const applicationModules = await manager.findBy(Module_1.ApplicationModule, {
                id: (0, typeorm_2.In)(moduleIds),
            });
            console.log(applicationModules, 'applicationModules');
            if (applicationModules.length !== moduleIds.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.MODULE_NOT_FOUND);
            }
            const existingModules = await manager.findBy(PackageModule_1.PackageModule, {
                packageId,
                moduleId: (0, typeorm_2.In)(moduleIds),
            });
            const existingModuleIds = existingModules.map((pm) => pm.moduleId);
            const newModuleIds = moduleIds.filter((id) => !existingModuleIds.includes(id));
            if (newModuleIds.length > 0) {
                const packageModules = newModuleIds.map((moduleId) => manager.create(PackageModule_1.PackageModule, { packageId, moduleId }));
                await manager.save(packageModules);
            }
            const updatedPkg = await manager.findOne(Package_1.Package, {
                where: { id: packageId },
                relations: ['modules'],
            });
            console.log(updatedPkg, 'updatedPkg');
            await queryRunner.commitTransaction();
            return updatedPkg;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async dropdownPackageList(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.PackageRepository, {
            relations: ['modules'],
            defaultLimit: limit,
            maxLimit: 50,
            defaultSortBy: [['createdAt', 'DESC']],
            sortableColumns: ['id', 'name', 'status', 'createdAt'],
            filterableColumns: {
                name: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ],
            },
            searchableColumns: ['name', 'status'],
        });
    }
};
exports.PackageService = PackageService;
exports.PackageService = PackageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Package_1.Package)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PackageService);
//# sourceMappingURL=package.service.js.map