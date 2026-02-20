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
exports.RoleStatusDto = exports.UpdateRoleDto = exports.CreateRoleDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const CustomStatus_1 = require("../../common/const/CustomStatus");
let CreateRoleDto = class CreateRoleDto {
};
exports.CreateRoleDto = CreateRoleDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateRoleDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsNumber)({ allowInfinity: false, allowNaN: false }, { each: true }),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], CreateRoleDto.prototype, "permissionIds", void 0);
exports.CreateRoleDto = CreateRoleDto = __decorate([
    (0, graphql_1.InputType)()
], CreateRoleDto);
let UpdateRoleDto = class UpdateRoleDto extends (0, graphql_1.PartialType)(CreateRoleDto) {
};
exports.UpdateRoleDto = UpdateRoleDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateRoleDto.prototype, "id", void 0);
exports.UpdateRoleDto = UpdateRoleDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateRoleDto);
let RoleStatusDto = class RoleStatusDto {
};
exports.RoleStatusDto = RoleStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], RoleStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => CustomStatus_1.CustomStatus),
    __metadata("design:type", String)
], RoleStatusDto.prototype, "status", void 0);
exports.RoleStatusDto = RoleStatusDto = __decorate([
    (0, graphql_1.InputType)()
], RoleStatusDto);
//# sourceMappingURL=role.dto.js.map