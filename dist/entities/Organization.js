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
exports.OrganizationUnion = exports.OrganizationArray = exports.PaginatedOrganizations = exports.Organization = void 0;
const withPagination_1 = require("../common/paginationDto/withPagination");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Project_1 = require("./Project");
const User_1 = require("./User");
const Role_1 = require("./Role");
const helper_1 = require("../common/helpers/helper");
let Organization = class Organization {
};
exports.Organization = Organization;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Organization.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Organization.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Organization.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => User_1.User, (user) => user.organization),
    __metadata("design:type", Array)
], Organization.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Role_1.Role, (role) => role.organization),
    __metadata("design:type", Array)
], Organization.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Project_1.Project, (project) => project.organization),
    __metadata("design:type", Array)
], Organization.prototype, "projects", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Organization.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Organization.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Organization.prototype, "deletedAt", void 0);
exports.Organization = Organization = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('organizations'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Organization);
let PaginatedOrganizations = class PaginatedOrganizations extends withPagination_1.WithPagination {
};
exports.PaginatedOrganizations = PaginatedOrganizations;
__decorate([
    (0, graphql_1.Field)(() => [Organization]),
    __metadata("design:type", Array)
], PaginatedOrganizations.prototype, "data", void 0);
exports.PaginatedOrganizations = PaginatedOrganizations = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedOrganizations);
let OrganizationArray = class OrganizationArray {
};
exports.OrganizationArray = OrganizationArray;
__decorate([
    (0, graphql_1.Field)(() => [Organization]),
    __metadata("design:type", Array)
], OrganizationArray.prototype, "data", void 0);
exports.OrganizationArray = OrganizationArray = __decorate([
    (0, graphql_1.ObjectType)()
], OrganizationArray);
exports.OrganizationUnion = (0, helper_1.createSmartUnion)('OrganizationUnion', () => Organization, () => OrganizationArray, 'data');
//# sourceMappingURL=Organization.js.map