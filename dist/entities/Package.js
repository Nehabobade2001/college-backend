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
exports.PackageUnion = exports.PackageArray = exports.PaginatedPackages = exports.Package = void 0;
const typeorm_1 = require("typeorm");
const Module_1 = require("./Module");
const graphql_1 = require("@nestjs/graphql");
const withPagination_1 = require("../common/paginationDto/withPagination");
const helper_1 = require("../common/helpers/helper");
let Package = class Package {
};
exports.Package = Package;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Package.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Package.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Package.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Package.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Package.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Module_1.ApplicationModule]),
    (0, typeorm_1.ManyToMany)(() => Module_1.ApplicationModule, (module) => module.packages),
    (0, typeorm_1.JoinTable)({
        name: 'package_modules',
        joinColumn: { name: 'packageId' },
        inverseJoinColumn: { name: 'moduleId' },
    }),
    __metadata("design:type", Array)
], Package.prototype, "modules", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Package.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Package.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], Package.prototype, "deletedAt", void 0);
exports.Package = Package = __decorate([
    (0, typeorm_1.Entity)('packages'),
    (0, graphql_1.ObjectType)()
], Package);
let PaginatedPackages = class PaginatedPackages extends withPagination_1.WithPagination {
};
exports.PaginatedPackages = PaginatedPackages;
__decorate([
    (0, graphql_1.Field)(() => [Package]),
    __metadata("design:type", Array)
], PaginatedPackages.prototype, "data", void 0);
exports.PaginatedPackages = PaginatedPackages = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedPackages);
let PackageArray = class PackageArray {
};
exports.PackageArray = PackageArray;
__decorate([
    (0, graphql_1.Field)(() => [Package]),
    __metadata("design:type", Array)
], PackageArray.prototype, "data", void 0);
exports.PackageArray = PackageArray = __decorate([
    (0, graphql_1.ObjectType)()
], PackageArray);
exports.PackageUnion = (0, helper_1.createSmartUnion)('PackageUnion', () => Package, () => PackageArray, 'data');
//# sourceMappingURL=Package.js.map