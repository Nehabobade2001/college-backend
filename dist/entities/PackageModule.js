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
exports.PackageModule = void 0;
const typeorm_1 = require("typeorm");
const Package_1 = require("./Package");
const Module_1 = require("./Module");
let PackageModule = class PackageModule {
};
exports.PackageModule = PackageModule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PackageModule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PackageModule.prototype, "packageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], PackageModule.prototype, "moduleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Package_1.Package),
    __metadata("design:type", Package_1.Package)
], PackageModule.prototype, "package", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Module_1.ApplicationModule),
    __metadata("design:type", Module_1.ApplicationModule)
], PackageModule.prototype, "module", void 0);
exports.PackageModule = PackageModule = __decorate([
    (0, typeorm_1.Entity)('package_modules')
], PackageModule);
//# sourceMappingURL=PackageModule.js.map