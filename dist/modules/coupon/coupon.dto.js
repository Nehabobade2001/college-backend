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
exports.CouponStatusDto = exports.UpdateCouponDto = exports.CreateCouponDto = exports.CouponStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var CouponStatus;
(function (CouponStatus) {
    CouponStatus["active"] = "active";
    CouponStatus["inactive"] = "inactive";
    CouponStatus["expired"] = "expired";
    CouponStatus["used"] = "used";
})(CouponStatus || (exports.CouponStatus = CouponStatus = {}));
(0, graphql_1.registerEnumType)(CouponStatus, {
    name: 'CouponStatus',
    description: 'Coupon Status',
});
let CreateCouponDto = class CreateCouponDto {
};
exports.CreateCouponDto = CreateCouponDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "couponCode", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "discountValue", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "minOrderAmount", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "usageLimit", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "endDate", void 0);
exports.CreateCouponDto = CreateCouponDto = __decorate([
    (0, graphql_1.InputType)()
], CreateCouponDto);
let UpdateCouponDto = class UpdateCouponDto extends CreateCouponDto {
};
exports.UpdateCouponDto = UpdateCouponDto;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateCouponDto.prototype, "id", void 0);
exports.UpdateCouponDto = UpdateCouponDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateCouponDto);
let CouponStatusDto = class CouponStatusDto {
};
exports.CouponStatusDto = CouponStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], CouponStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => CouponStatus),
    __metadata("design:type", String)
], CouponStatusDto.prototype, "status", void 0);
exports.CouponStatusDto = CouponStatusDto = __decorate([
    (0, graphql_1.InputType)()
], CouponStatusDto);
//# sourceMappingURL=coupon.dto.js.map