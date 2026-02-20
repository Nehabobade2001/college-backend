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
exports.PackageStatusDto = exports.UpdatePackageDto = exports.CreatePackageDto = exports.PackageStatus = void 0;
const Coupon_1 = require("../../entities/Coupon");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var PackageStatus;
(function (PackageStatus) {
    PackageStatus["active"] = "active";
    PackageStatus["inactive"] = "inactive";
    PackageStatus["blocked"] = "blocked";
    PackageStatus["pending"] = "pending";
})(PackageStatus || (exports.PackageStatus = PackageStatus = {}));
(0, graphql_1.registerEnumType)(PackageStatus, {
    name: 'PackageStatus',
    description: 'Package Status',
});
let CreatePackageDto = class CreatePackageDto {
};
exports.CreatePackageDto = CreatePackageDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePackageDto.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePackageDto.prototype, "discountedPrice", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "offerType", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "offerExpiryDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePackageDto.prototype, "offerDescription", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreatePackageDto.prototype, "moduleIds", void 0);
exports.CreatePackageDto = CreatePackageDto = __decorate([
    (0, graphql_1.InputType)()
], CreatePackageDto);
let UpdatePackageDto = class UpdatePackageDto extends CreatePackageDto {
};
exports.UpdatePackageDto = UpdatePackageDto;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdatePackageDto.prototype, "id", void 0);
exports.UpdatePackageDto = UpdatePackageDto = __decorate([
    (0, graphql_1.InputType)()
], UpdatePackageDto);
let PackageStatusDto = class PackageStatusDto {
};
exports.PackageStatusDto = PackageStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], PackageStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => PackageStatus),
    __metadata("design:type", String)
], PackageStatusDto.prototype, "status", void 0);
exports.PackageStatusDto = PackageStatusDto = __decorate([
    (0, graphql_1.InputType)()
], PackageStatusDto);
//# sourceMappingURL=package.dto.js.map