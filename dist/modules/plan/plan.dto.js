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
exports.PlanStatusDto = exports.UpdatePlanDto = exports.CreatePlanDto = exports.PlanStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var PlanStatus;
(function (PlanStatus) {
    PlanStatus["active"] = "active";
    PlanStatus["inactive"] = "inactive";
    PlanStatus["expired"] = "expired";
})(PlanStatus || (exports.PlanStatus = PlanStatus = {}));
(0, graphql_1.registerEnumType)(PlanStatus, {
    name: 'PlanStatus',
    description: 'Plan Status',
});
let CreatePlanDto = class CreatePlanDto {
};
exports.CreatePlanDto = CreatePlanDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "discountedPrice", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "duration", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "couponCode", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "packageId", void 0);
exports.CreatePlanDto = CreatePlanDto = __decorate([
    (0, graphql_1.InputType)()
], CreatePlanDto);
let UpdatePlanDto = class UpdatePlanDto extends CreatePlanDto {
};
exports.UpdatePlanDto = UpdatePlanDto;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdatePlanDto.prototype, "id", void 0);
exports.UpdatePlanDto = UpdatePlanDto = __decorate([
    (0, graphql_1.InputType)()
], UpdatePlanDto);
let PlanStatusDto = class PlanStatusDto {
};
exports.PlanStatusDto = PlanStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], PlanStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => PlanStatus),
    __metadata("design:type", String)
], PlanStatusDto.prototype, "status", void 0);
exports.PlanStatusDto = PlanStatusDto = __decorate([
    (0, graphql_1.InputType)()
], PlanStatusDto);
//# sourceMappingURL=plan.dto.js.map