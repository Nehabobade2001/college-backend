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
exports.UserStatusDto = exports.ChangePasswordDto = exports.UserListInputDTO = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const withPagination_1 = require("../../common/paginationDto/withPagination");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const CustomStatus_1 = require("../../common/const/CustomStatus");
const User_1 = require("../../entities/User");
let CreateUserDto = class CreateUserDto {
};
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "mobileNo", void 0);
__decorate([
    (0, graphql_1.Field)(() => [graphql_1.Int]),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CreateUserDto.prototype, "roleIds", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)(() => User_1.UserType, { nullable: true }),
    (0, class_validator_1.IsEnum)(User_1.UserType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userType", void 0);
__decorate([
    (0, graphql_1.Field)(() => User_1.Designation),
    (0, class_validator_1.IsEnum)(User_1.Designation),
    __metadata("design:type", String)
], CreateUserDto.prototype, "designation", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "parentId", void 0);
exports.CreateUserDto = CreateUserDto = __decorate([
    (0, graphql_1.InputType)()
], CreateUserDto);
let UpdateUserDto = class UpdateUserDto extends (0, graphql_1.PartialType)(CreateUserDto) {
};
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateUserDto.prototype, "id", void 0);
exports.UpdateUserDto = UpdateUserDto = __decorate([
    (0, graphql_1.InputType)()
], UpdateUserDto);
let UserListInputDTO = class UserListInputDTO extends (0, graphql_1.PartialType)(withPagination_1.ListInputDTO) {
};
exports.UserListInputDTO = UserListInputDTO;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserListInputDTO.prototype, "parentId", void 0);
exports.UserListInputDTO = UserListInputDTO = __decorate([
    (0, graphql_1.InputType)()
], UserListInputDTO);
let ChangePasswordDto = class ChangePasswordDto {
};
exports.ChangePasswordDto = ChangePasswordDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "currentPassword", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDto.prototype, "email", void 0);
exports.ChangePasswordDto = ChangePasswordDto = __decorate([
    (0, graphql_1.InputType)()
], ChangePasswordDto);
let UserStatusDto = class UserStatusDto {
};
exports.UserStatusDto = UserStatusDto;
__decorate([
    (0, graphql_1.Field)(() => [Number]),
    __metadata("design:type", Number)
], UserStatusDto.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)(() => CustomStatus_1.CustomStatus),
    __metadata("design:type", String)
], UserStatusDto.prototype, "status", void 0);
exports.UserStatusDto = UserStatusDto = __decorate([
    (0, graphql_1.InputType)()
], UserStatusDto);
//# sourceMappingURL=user.dto.js.map