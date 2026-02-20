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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListInputDTO = exports.WithPagination = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
let Meta = class Meta {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Meta.prototype, "totalItems", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Meta.prototype, "totalPages", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Meta.prototype, "currentPage", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Number)
], Meta.prototype, "limit", void 0);
Meta = __decorate([
    (0, graphql_1.ObjectType)()
], Meta);
let WithPagination = class WithPagination {
};
exports.WithPagination = WithPagination;
__decorate([
    (0, graphql_1.Field)(() => Meta),
    (0, graphql_1.Directive)('@shareable'),
    __metadata("design:type", Meta)
], WithPagination.prototype, "meta", void 0);
exports.WithPagination = WithPagination = __decorate([
    (0, graphql_1.ObjectType)()
], WithPagination);
let ListInputDTO = class ListInputDTO {
    constructor() {
        this.path = '';
    }
};
exports.ListInputDTO = ListInputDTO;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ListInputDTO.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ListInputDTO.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => [[String]], { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ListInputDTO.prototype, "sortBy", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ListInputDTO.prototype, "searchBy", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInputDTO.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_type_json_1.default, { nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ListInputDTO.prototype, "filter", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ListInputDTO.prototype, "select", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInputDTO.prototype, "cursor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInputDTO.prototype, "cursorColumn", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInputDTO.prototype, "cursorDirection", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListInputDTO.prototype, "path", void 0);
exports.ListInputDTO = ListInputDTO = __decorate([
    (0, graphql_1.InputType)()
], ListInputDTO);
//# sourceMappingURL=withPagination.js.map