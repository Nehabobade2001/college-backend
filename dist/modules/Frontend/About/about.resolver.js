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
exports.AboutResolver = void 0;
const About_1 = require("../../../entities/About");
const graphql_1 = require("@nestjs/graphql");
const about_service_1 = require("./about.service");
const about_dto_1 = require("./about.dto");
let AboutResolver = class AboutResolver {
    constructor(aboutService) {
        this.aboutService = aboutService;
    }
    async getAllAbout() {
        return this.aboutService.getAllAbout();
    }
    async createAbout(data) {
        return this.aboutService.create(data);
    }
    async getAboutById(id) {
        return this.aboutService.getAboutById(id);
    }
    async updateAbout(data) {
        return this.aboutService.update(data);
    }
    async deleteAbout(id) {
        await this.aboutService.deleteAbout(id);
        return true;
    }
};
exports.AboutResolver = AboutResolver;
__decorate([
    (0, graphql_1.Query)(() => [About_1.About]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AboutResolver.prototype, "getAllAbout", null);
__decorate([
    (0, graphql_1.Mutation)(() => About_1.About),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [about_dto_1.CreateAboutDto]),
    __metadata("design:returntype", Promise)
], AboutResolver.prototype, "createAbout", null);
__decorate([
    (0, graphql_1.Query)(() => About_1.About),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AboutResolver.prototype, "getAboutById", null);
__decorate([
    (0, graphql_1.Mutation)(() => About_1.About),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [about_dto_1.UpdateAboutDto]),
    __metadata("design:returntype", Promise)
], AboutResolver.prototype, "updateAbout", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AboutResolver.prototype, "deleteAbout", null);
exports.AboutResolver = AboutResolver = __decorate([
    (0, graphql_1.Resolver)(() => About_1.About),
    __metadata("design:paramtypes", [about_service_1.AboutService])
], AboutResolver);
//# sourceMappingURL=about.resolver.js.map