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
exports.PaginatedPermissions = exports.Permissions = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Role_1 = require("./Role");
const withPagination_1 = require("../common/paginationDto/withPagination");
let Permissions = class Permissions {
};
exports.Permissions = Permissions;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Permissions.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], Permissions.prototype, "appName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], Permissions.prototype, "groupName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], Permissions.prototype, "module", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], Permissions.prototype, "action", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], Permissions.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 255,
    }),
    __metadata("design:type", String)
], Permissions.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Role_1.Role, (role) => role.permissions),
    __metadata("design:type", Array)
], Permissions.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Permissions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Permissions.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Permissions.prototype, "deletedAt", void 0);
exports.Permissions = Permissions = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('permissions'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Permissions);
let PaginatedPermissions = class PaginatedPermissions extends withPagination_1.WithPagination {
};
exports.PaginatedPermissions = PaginatedPermissions;
__decorate([
    (0, graphql_1.Field)(() => [Permissions]),
    __metadata("design:type", Array)
], PaginatedPermissions.prototype, "data", void 0);
exports.PaginatedPermissions = PaginatedPermissions = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedPermissions);
//# sourceMappingURL=Permissions.js.map