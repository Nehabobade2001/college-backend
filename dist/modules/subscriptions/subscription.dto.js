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
exports.SubscriptionStatusDto = exports.UpdateSubscriptionDto = exports.CreateSubscriptionDto = exports.SubscriptionStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var SubscriptionStatus;
(function (SubscriptionStatus) {
    SubscriptionStatus["active"] = "active";
    SubscriptionStatus["inactive"] = "inactive";
    SubscriptionStatus["expired"] = "expired";
})(SubscriptionStatus || (exports.SubscriptionStatus = SubscriptionStatus = {}));
(0, graphql_1.registerEnumType)(SubscriptionStatus, {
    name: 'SubscriptionStatus',
    description: 'Subscription Status',
});
let CreateSubscriptionDto = class CreateSubscriptionDto {
};
exports.CreateSubscriptionDto = CreateSubscriptionDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSubscriptionDto.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateSubscriptionDto.prototype, "discountedPrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSubscriptionDto.prototype, "duration", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateSubscriptionDto.prototype, "planIds", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateSubscriptionDto.prototype, "couponCode", void 0);
exports.CreateSubscriptionDto = CreateSubscriptionDto = __decorate([
    (0, graphql_1.InputType)()
], CreateSubscriptionDto);
let UpdateSubscriptionDto = class UpdateSubscriptionDto extends CreateSubscriptionDto {
};
exports.UpdateSubscriptionDto = UpdateSubscriptionDto;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateSubscriptionDto.prototype, "id", void 0);
exports.UpdateSubscriptionDto = UpdateSubscriptionDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateSubscriptionDto);
let SubscriptionStatusDto = class SubscriptionStatusDto {
};
exports.SubscriptionStatusDto = SubscriptionStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], SubscriptionStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => SubscriptionStatus),
    __metadata("design:type", String)
], SubscriptionStatusDto.prototype, "status", void 0);
exports.SubscriptionStatusDto = SubscriptionStatusDto = __decorate([
    (0, graphql_1.InputType)()
], SubscriptionStatusDto);
//# sourceMappingURL=subscription.dto.js.map