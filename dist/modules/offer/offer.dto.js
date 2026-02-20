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
exports.OfferStatusDto = exports.UpdateOfferDto = exports.CreateOfferDto = exports.OfferTypeStatus = exports.OfferStatus = void 0;
const Coupon_1 = require("../../entities/Coupon");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var OfferStatus;
(function (OfferStatus) {
    OfferStatus["active"] = "active";
    OfferStatus["inactive"] = "inactive";
    OfferStatus["expired"] = "expired";
})(OfferStatus || (exports.OfferStatus = OfferStatus = {}));
(0, graphql_1.registerEnumType)(OfferStatus, {
    name: 'OfferStatus',
    description: 'OFFER STATUS',
});
var OfferTypeStatus;
(function (OfferTypeStatus) {
    OfferTypeStatus["DISCOUNT"] = "DISCOUNT";
    OfferTypeStatus["CASHBACK"] = "CASHBACK";
})(OfferTypeStatus || (exports.OfferTypeStatus = OfferTypeStatus = {}));
(0, graphql_1.registerEnumType)(OfferTypeStatus, {
    name: 'OfferTypeStatus',
    description: 'Offer Status',
});
let CreateOfferDto = class CreateOfferDto {
};
exports.CreateOfferDto = CreateOfferDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "offerType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "discountValue", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "discountPercent", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateOfferDto.prototype, "usageLimit", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOfferDto.prototype, "endDate", void 0);
exports.CreateOfferDto = CreateOfferDto = __decorate([
    (0, graphql_1.InputType)()
], CreateOfferDto);
let UpdateOfferDto = class UpdateOfferDto extends CreateOfferDto {
};
exports.UpdateOfferDto = UpdateOfferDto;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateOfferDto.prototype, "id", void 0);
exports.UpdateOfferDto = UpdateOfferDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateOfferDto);
let OfferStatusDto = class OfferStatusDto {
};
exports.OfferStatusDto = OfferStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], OfferStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => OfferStatus),
    __metadata("design:type", String)
], OfferStatusDto.prototype, "status", void 0);
exports.OfferStatusDto = OfferStatusDto = __decorate([
    (0, graphql_1.InputType)()
], OfferStatusDto);
//# sourceMappingURL=offer.dto.js.map