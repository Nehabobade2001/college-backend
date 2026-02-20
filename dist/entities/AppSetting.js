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
exports.AppSetting = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let AppSetting = class AppSetting {
};
exports.AppSetting = AppSetting;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppSetting.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', default: 'App Title' }),
    __metadata("design:type", String)
], AppSetting.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", String)
], AppSetting.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", String)
], AppSetting.prototype, "logo", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", String)
], AppSetting.prototype, "favicon", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", String)
], AppSetting.prototype, "coverImage", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", String)
], AppSetting.prototype, "copyRight", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: null }),
    __metadata("design:type", String)
], AppSetting.prototype, "supportEmail", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true, default: null }),
    __metadata("design:type", Number)
], AppSetting.prototype, "supportPhone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: null }),
    __metadata("design:type", Boolean)
], AppSetting.prototype, "twoFactorAuth", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: null }),
    __metadata("design:type", Boolean)
], AppSetting.prototype, "otpSMS", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: null }),
    __metadata("design:type", Boolean)
], AppSetting.prototype, "otpEmail", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: null }),
    __metadata("design:type", Boolean)
], AppSetting.prototype, "captcha", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AppSetting.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AppSetting.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], AppSetting.prototype, "deletedAt", void 0);
exports.AppSetting = AppSetting = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)('app_settings'),
    (0, graphql_1.Directive)('@key(fields: "id")')
], AppSetting);
//# sourceMappingURL=AppSetting.js.map