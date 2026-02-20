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
exports.OfferResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
const withPagination_1 = require("../../common/paginationDto/withPagination");
const Offer_1 = require("../../entities/Offer");
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const offer_dto_1 = require("./offer.dto");
const offer_service_1 = require("./offer.service");
const GraphQLErrorHandling_1 = require("../../common/helpers/GraphQLErrorHandling");
const ErrorCodes_1 = require("../../common/const/ErrorCodes");
let OfferResolver = class OfferResolver {
    constructor(OfferService) {
        this.OfferService = OfferService;
    }
    async createOffer(createOfferInput) {
        return this.OfferService.create(createOfferInput);
    }
    async paginatedOffers(listInputDTO) {
        const paginationResult = await this.OfferService.listWithPagination(listInputDTO);
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
    async findOfferById(id) {
        return this.OfferService.findById(id);
    }
    async updateOffer(updateOfferInput) {
        return this.OfferService.update(updateOfferInput);
    }
    async changeOfferStatus(updateOfferStatusInput) {
        const offers = await this.OfferService.enableOffer(updateOfferStatusInput);
        if (!offers.length || offers.some((o) => !o || !o.id)) {
            (0, GraphQLErrorHandling_1.throwGqlError)(ErrorCodes_1.ErrorCodes.OFFER_NOT_FOUND);
        }
        return offers.length === 1 ? offers[0] : { data: offers };
    }
    async deleteOffer(ids) {
        return this.OfferService.delete(ids);
    }
    async hardDeleteOffer(ids) {
        return this.OfferService.hardDelete(ids);
    }
    async restoreOffer(ids) {
        await this.OfferService.restore(ids);
        return true;
    }
    async trashedOffers(listInputDTO) {
        const paginationResult = await this.OfferService.listTrashedWithPagination(listInputDTO);
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
    async dropdownOffers(listInputDTO) {
        const paginationResult = await this.OfferService.dropdown(listInputDTO);
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
exports.OfferResolver = OfferResolver;
__decorate([
    (0, graphql_1.Mutation)(() => Offer_1.Offer),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Create'),
    __param(0, (0, graphql_1.Args)('createOfferInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.CreateOfferDto]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "createOffer", null);
__decorate([
    (0, graphql_1.Query)(() => Offer_1.PaginatedOffers),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "paginatedOffers", null);
__decorate([
    (0, graphql_1.Query)(() => Offer_1.Offer),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Read'),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "findOfferById", null);
__decorate([
    (0, graphql_1.Mutation)(() => Offer_1.Offer),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Update'),
    __param(0, (0, graphql_1.Args)('updateOfferInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.UpdateOfferDto]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "updateOffer", null);
__decorate([
    (0, graphql_1.Mutation)(() => Offer_1.OfferUnion),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Action'),
    __param(0, (0, graphql_1.Args)('updateOfferStatusInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.OfferStatusDto]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "changeOfferStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "deleteOffer", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Delete'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "hardDeleteOffer", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Restore'),
    __param(0, (0, graphql_1.Args)('ids', { type: () => [graphql_1.Int] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "restoreOffer", null);
__decorate([
    (0, graphql_1.Query)(() => Offer_1.PaginatedOffers),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Offer:Read'),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "trashedOffers", null);
__decorate([
    (0, graphql_1.Query)(() => Offer_1.PaginatedOffers),
    __param(0, (0, graphql_1.Args)('ListInputDTO')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withPagination_1.ListInputDTO]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "dropdownOffers", null);
exports.OfferResolver = OfferResolver = __decorate([
    (0, graphql_1.Resolver)(() => Offer_1.Offer),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [offer_service_1.OfferService])
], OfferResolver);
//# sourceMappingURL=offer.resolver.js.map