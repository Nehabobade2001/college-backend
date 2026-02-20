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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferUnion = exports.OfferArray = exports.PaginatedOffers = exports.Offer = void 0;
const helper_1 = require("../common/helpers/helper");
const withPagination_1 = require("../common/paginationDto/withPagination");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let Offer = class Offer {
};
exports.Offer = Offer;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Offer.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Offer.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Offer.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Offer.prototype, "offerType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Offer.prototype, "discountPercent", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Offer.prototype, "discountValue", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Offer.prototype, "usageLimit", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Offer.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'datetime' }),
    __metadata("design:type", Date)
], Offer.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Offer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Offer.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Offer.prototype, "deletedAt", void 0);
exports.Offer = Offer = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('offers'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Offer);
let PaginatedOffers = class PaginatedOffers extends withPagination_1.WithPagination {
};
exports.PaginatedOffers = PaginatedOffers;
__decorate([
    (0, graphql_1.Field)(() => [Offer]),
    __metadata("design:type", Array)
], PaginatedOffers.prototype, "data", void 0);
exports.PaginatedOffers = PaginatedOffers = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedOffers);
let OfferArray = class OfferArray {
};
exports.OfferArray = OfferArray;
__decorate([
    (0, graphql_1.Field)(() => [Offer]),
    __metadata("design:type", Array)
], OfferArray.prototype, "data", void 0);
exports.OfferArray = OfferArray = __decorate([
    (0, graphql_1.ObjectType)()
], OfferArray);
exports.OfferUnion = (0, helper_1.createSmartUnion)('OfferUnion', () => Offer, () => OfferArray, 'data');
//# sourceMappingURL=Offer.js.map