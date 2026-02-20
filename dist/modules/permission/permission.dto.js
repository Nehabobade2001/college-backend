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
exports.DynamicPermissionsDto = exports.AppPermissionsDto = exports.PermissionGroupDto = exports.PermissionDto = exports.Group = exports.Module = exports.PermissionGroup = exports.UpdatePermissionDto = exports.CreatePermissionDto = exports.appName = void 0;
const Permissions_1 = require("../../entities/Permissions");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
var appName;
(function (appName) {
    appName[appName["MasterApp"] = 0] = "MasterApp";
    appName[appName["TaskManagement"] = 1] = "TaskManagement";
    appName[appName["MaterialManagement"] = 2] = "MaterialManagement";
    appName[appName["VehicleManagement"] = 3] = "VehicleManagement";
})(appName || (exports.appName = appName = {}));
(0, graphql_1.registerEnumType)(appName, {
    name: 'appName',
});
let CreatePermissionDto = class CreatePermissionDto {
};
exports.CreatePermissionDto = CreatePermissionDto;
__decorate([
    (0, graphql_1.Field)(() => appName),
    __metadata("design:type", Number)
], CreatePermissionDto.prototype, "appName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "action", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "module", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionDto.prototype, "description", void 0);
exports.CreatePermissionDto = CreatePermissionDto = __decorate([
    (0, graphql_1.InputType)()
], CreatePermissionDto);
let UpdatePermissionDto = class UpdatePermissionDto extends (0, graphql_1.PartialType)(CreatePermissionDto) {
};
exports.UpdatePermissionDto = UpdatePermissionDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdatePermissionDto.prototype, "id", void 0);
exports.UpdatePermissionDto = UpdatePermissionDto = __decorate([
    (0, graphql_1.InputType)()
], UpdatePermissionDto);
let PermissionGroup = class PermissionGroup {
};
exports.PermissionGroup = PermissionGroup;
__decorate([
    (0, graphql_1.Field)(() => [Module]),
    __metadata("design:type", Array)
], PermissionGroup.prototype, "modules", void 0);
exports.PermissionGroup = PermissionGroup = __decorate([
    (0, graphql_1.ObjectType)()
], PermissionGroup);
let Module = class Module {
};
exports.Module = Module;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Module.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Group]),
    __metadata("design:type", Array)
], Module.prototype, "groups", void 0);
exports.Module = Module = __decorate([
    (0, graphql_1.ObjectType)()
], Module);
let Group = class Group {
};
exports.Group = Group;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Permissions_1.Permissions]),
    __metadata("design:type", Array)
], Group.prototype, "permissions", void 0);
exports.Group = Group = __decorate([
    (0, graphql_1.ObjectType)()
], Group);
let PermissionDto = class PermissionDto {
};
exports.PermissionDto = PermissionDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], PermissionDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PermissionDto.prototype, "module", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PermissionDto.prototype, "action", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PermissionDto.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PermissionDto.prototype, "slug", void 0);
exports.PermissionDto = PermissionDto = __decorate([
    (0, graphql_1.ObjectType)()
], PermissionDto);
let PermissionGroupDto = class PermissionGroupDto {
};
exports.PermissionGroupDto = PermissionGroupDto;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], PermissionGroupDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PermissionDto]),
    __metadata("design:type", Array)
], PermissionGroupDto.prototype, "permissions", void 0);
exports.PermissionGroupDto = PermissionGroupDto = __decorate([
    (0, graphql_1.ObjectType)()
], PermissionGroupDto);
let AppPermissionsDto = class AppPermissionsDto {
};
exports.AppPermissionsDto = AppPermissionsDto;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AppPermissionsDto.prototype, "appName", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PermissionGroupDto]),
    __metadata("design:type", Array)
], AppPermissionsDto.prototype, "modules", void 0);
exports.AppPermissionsDto = AppPermissionsDto = __decorate([
    (0, graphql_1.ObjectType)()
], AppPermissionsDto);
let DynamicPermissionsDto = class DynamicPermissionsDto {
};
exports.DynamicPermissionsDto = DynamicPermissionsDto;
__decorate([
    (0, graphql_1.Field)(() => [AppPermissionsDto]),
    __metadata("design:type", Array)
], DynamicPermissionsDto.prototype, "apps", void 0);
exports.DynamicPermissionsDto = DynamicPermissionsDto = __decorate([
    (0, graphql_1.ObjectType)()
], DynamicPermissionsDto);
//# sourceMappingURL=permission.dto.js.map