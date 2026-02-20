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
exports.ModuleStatusDto = exports.UpdateModuleDto = exports.CreateModuleDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const CustomStatus_1 = require("../../common/const/CustomStatus");
let CreateModuleDto = class CreateModuleDto {
};
exports.CreateModuleDto = CreateModuleDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateModuleDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateModuleDto.prototype, "description", void 0);
exports.CreateModuleDto = CreateModuleDto = __decorate([
    (0, graphql_1.InputType)()
], CreateModuleDto);
let UpdateModuleDto = class UpdateModuleDto extends CreateModuleDto {
};
exports.UpdateModuleDto = UpdateModuleDto;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateModuleDto.prototype, "id", void 0);
exports.UpdateModuleDto = UpdateModuleDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateModuleDto);
let ModuleStatusDto = class ModuleStatusDto {
};
exports.ModuleStatusDto = ModuleStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Number)
], ModuleStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => CustomStatus_1.CustomStatus),
    __metadata("design:type", String)
], ModuleStatusDto.prototype, "status", void 0);
exports.ModuleStatusDto = ModuleStatusDto = __decorate([
    (0, graphql_1.InputType)()
], ModuleStatusDto);
//# sourceMappingURL=module.dto.js.map