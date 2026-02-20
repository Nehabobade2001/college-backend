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
exports.OrganizationStatusDto = exports.UpdateOrganizationDto = exports.CreateOrganizationDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const project_dto_1 = require("../project/project.dto");
let CreateOrganizationDto = class CreateOrganizationDto {
};
exports.CreateOrganizationDto = CreateOrganizationDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrganizationDto.prototype, "description", void 0);
exports.CreateOrganizationDto = CreateOrganizationDto = __decorate([
    (0, graphql_1.InputType)()
], CreateOrganizationDto);
let UpdateOrganizationDto = class UpdateOrganizationDto extends CreateOrganizationDto {
};
exports.UpdateOrganizationDto = UpdateOrganizationDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateOrganizationDto.prototype, "id", void 0);
exports.UpdateOrganizationDto = UpdateOrganizationDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateOrganizationDto);
let OrganizationStatusDto = class OrganizationStatusDto {
};
exports.OrganizationStatusDto = OrganizationStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Array)
], OrganizationStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => project_dto_1.CustomStatus),
    __metadata("design:type", String)
], OrganizationStatusDto.prototype, "status", void 0);
exports.OrganizationStatusDto = OrganizationStatusDto = __decorate([
    (0, graphql_1.InputType)()
], OrganizationStatusDto);
//# sourceMappingURL=organization.dto.js.map