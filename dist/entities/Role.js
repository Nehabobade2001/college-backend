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
exports.RoleUnion = exports.RoleArray = exports.PaginatedRoles = exports.Role = void 0;
const typeorm_1 = require("typeorm");
const Permissions_1 = require("./Permissions");
const User_1 = require("./User");
const graphql_1 = require("@nestjs/graphql");
const withPagination_1 = require("../common/paginationDto/withPagination");
const RolePermissions_1 = require("./RolePermissions");
const UserRole_1 = require("./UserRole");
const Organization_1 = require("./Organization");
const helper_1 = require("../common/helpers/helper");
let Role = class Role {
};
exports.Role = Role;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], Role.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User_1.User, (user) => user.roles),
    __metadata("design:type", Array)
], Role.prototype, "users", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Permissions_1.Permissions]),
    (0, typeorm_1.ManyToMany)(() => Permissions_1.Permissions, (permissions) => permissions.roles),
    (0, typeorm_1.JoinTable)({
        name: 'role_permissions',
        joinColumn: { name: 'roleId' },
        inverseJoinColumn: { name: 'permissionId' },
    }),
    __metadata("design:type", Array)
], Role.prototype, "permissions", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Role.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Role.prototype, "roleType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Role.prototype, "isPrimary", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Role.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Role.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Role.prototype, "permissionCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RolePermissions_1.RolePermissions, (rp) => rp.role),
    __metadata("design:type", RolePermissions_1.RolePermissions)
], Role.prototype, "rolePermissions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRole_1.UserRole, (userRole) => userRole.role),
    __metadata("design:type", Array)
], Role.prototype, "userRoles", void 0);
__decorate([
    (0, graphql_1.Field)(() => Organization_1.Organization, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, (organization) => organization.roles),
    __metadata("design:type", Organization_1.Organization)
], Role.prototype, "organization", void 0);
exports.Role = Role = __decorate([
    (0, typeorm_1.Entity)('roles'),
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Role);
let PaginatedRoles = class PaginatedRoles extends withPagination_1.WithPagination {
};
exports.PaginatedRoles = PaginatedRoles;
__decorate([
    (0, graphql_1.Field)(() => [Role]),
    __metadata("design:type", Array)
], PaginatedRoles.prototype, "data", void 0);
exports.PaginatedRoles = PaginatedRoles = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedRoles);
let RoleArray = class RoleArray {
};
exports.RoleArray = RoleArray;
__decorate([
    (0, graphql_1.Field)(() => [Role]),
    __metadata("design:type", Array)
], RoleArray.prototype, "data", void 0);
exports.RoleArray = RoleArray = __decorate([
    (0, graphql_1.ObjectType)()
], RoleArray);
exports.RoleUnion = (0, helper_1.createSmartUnion)('RoleUnion', () => Role, () => RoleArray, 'data');
//# sourceMappingURL=Role.js.map