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
exports.OfferService = void 0;
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_paginate_1 = require("nestjs-paginate");
const typeorm_2 = require("typeorm");
const Offer_1 = require("../../entities/Offer");
let OfferService = class OfferService {
    constructor(OfferRepository) {
        this.OfferRepository = OfferRepository;
    }
    async create(OfferData) {
        const queryRunner = this.OfferRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            if (OfferData.startDate < OfferData.endDate && OfferData.usageLimit > 0) {
                const offer = manager.create(Offer_1.Offer, {
                    ...OfferData,
                    status: 'active',
                });
                const savedOffer = await manager.save(offer);
                await queryRunner.commitTransaction();
                return savedOffer;
            }
            else {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_START_DATE_GREATER_THAN_END_DATE) ||
                    (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_USAGE_LIMIT_MUST_BE_GREATER_THAN_ZERO);
            }
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
        return (0, nestjs_paginate_1.paginate)(query, this.OfferRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'title', 'status', 'createdAt'],
            filterableColumns: {
                title: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['title', 'status'],
        });
    }
    async findById(id) {
        const queryRunner = this.OfferRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const offer = await manager.findOne(Offer_1.Offer, {
                where: { id: id ?? null },
            });
            if (!offer) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_NOT_FOUND);
            }
            await queryRunner.commitTransaction();
            return offer;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async update(OfferData) {
        const queryRunner = this.OfferRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const offer = await manager.findOne(Offer_1.Offer, {
                where: { id: OfferData.id ?? null },
            });
            if (!offer) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_NOT_FOUND);
            }
            manager.merge(Offer_1.Offer, offer, OfferData);
            const savedOffer = await manager.save(offer);
            await queryRunner.commitTransaction();
            return savedOffer;
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
        const queryRunner = this.OfferRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const offers = await manager.find(Offer_1.Offer, {
                where: idArray.map((id) => ({ id })),
            });
            if (offers.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_NOT_FOUND);
            }
            await manager.softDelete(Offer_1.Offer, ids);
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
        const queryRunner = this.OfferRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(ids) ? ids : [ids];
            const offers = await manager.find(Offer_1.Offer, {
                where: idArray.map((id) => ({ id })),
                withDeleted: true,
            });
            if (offers.length !== idArray.length) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.ORGANIZATION_NOT_FOUND);
            }
            if (offers.some((plan) => plan.deletedAt === null)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_CAN_NOT_BE_HARD_DELETED);
            }
            await manager.delete(Offer_1.Offer, ids);
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
        const Offer = await this.OfferRepository.find({
            where: idArray.map((id) => ({ id })),
            withDeleted: true,
        });
        if (Offer.length !== idArray.length) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_NOT_FOUND);
        }
        await this.OfferRepository.restore(ids);
    }
    async listTrashedWithPagination(query) {
        const limit = query.limit > 50 ? 50 : query.limit;
        return (0, nestjs_paginate_1.paginate)(query, this.OfferRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'title', 'status', 'createdAt'],
            filterableColumns: {
                title: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ],
            },
            searchableColumns: ['title', 'status'],
            withDeleted: true,
            where: { deletedAt: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()) },
        });
    }
    async enableOffer(data) {
        const queryRunner = this.OfferRepository.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const manager = queryRunner.manager;
        try {
            const idArray = Array.isArray(data.ids) ? data.ids : [data.ids];
            const offers = await manager.find(Offer_1.Offer, {
                where: idArray.map((id) => ({ id })),
            });
            if (offers.length !== idArray.length || offers.some((o) => !o || !o.id)) {
                (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_NOT_FOUND);
            }
            const updatedOffer = await manager.save(offers.map((offer) => manager.merge(Offer_1.Offer, offer, {
                status: data.status,
            })));
            await queryRunner.commitTransaction();
            return updatedOffer;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async dropdown(query) {
        const limit = Math.min(query.limit ?? 50, 50);
        return (0, nestjs_paginate_1.paginate)(query, this.OfferRepository, {
            defaultLimit: limit,
            defaultSortBy: [['createdAt', 'DESC']],
            maxLimit: 50,
            sortableColumns: ['id', 'title', 'status', 'createdAt'],
            filterableColumns: {
                title: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
                status: [nestjs_paginate_1.FilterOperator.EQ, nestjs_paginate_1.FilterOperator.ILIKE],
            },
            searchableColumns: ['title'],
        });
    }
};
exports.OfferService = OfferService;
exports.OfferService = OfferService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Offer_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OfferService);
//# sourceMappingURL=offer.service.js.map