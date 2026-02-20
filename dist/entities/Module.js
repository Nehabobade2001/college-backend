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
exports.ApplicationModuleUnion = exports.ApplicationModuleArray = exports.PaginatedApplicationModules = exports.ApplicationModule = void 0;
const withPagination_1 = require("../common/paginationDto/withPagination");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Package_1 = require("./Package");
const helper_1 = require("../common/helpers/helper");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ApplicationModule.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ApplicationModule.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ApplicationModule.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], ApplicationModule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Package_1.Package, (appPackage) => appPackage.modules, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], ApplicationModule.prototype, "packages", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ApplicationModule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ApplicationModule.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], ApplicationModule.prototype, "deletedAt", void 0);
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('modules'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], ApplicationModule);
let PaginatedApplicationModules = class PaginatedApplicationModules extends withPagination_1.WithPagination {
};
exports.PaginatedApplicationModules = PaginatedApplicationModules;
__decorate([
    (0, graphql_1.Field)(() => [ApplicationModule]),
    __metadata("design:type", Array)
], PaginatedApplicationModules.prototype, "data", void 0);
exports.PaginatedApplicationModules = PaginatedApplicationModules = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedApplicationModules);
let ApplicationModuleArray = class ApplicationModuleArray {
};
exports.ApplicationModuleArray = ApplicationModuleArray;
__decorate([
    (0, graphql_1.Field)(() => [ApplicationModule]),
    __metadata("design:type", Array)
], ApplicationModuleArray.prototype, "data", void 0);
exports.ApplicationModuleArray = ApplicationModuleArray = __decorate([
    (0, graphql_1.ObjectType)()
], ApplicationModuleArray);
exports.ApplicationModuleUnion = (0, helper_1.createSmartUnion)('ApplicationModuleUnion', () => ApplicationModule, () => ApplicationModuleArray, 'data');
//# sourceMappingURL=Module.js.map