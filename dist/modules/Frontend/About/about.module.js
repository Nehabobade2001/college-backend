"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutModule = void 0;
const About_1 = require("../../../entities/About");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const about_service_1 = require("./about.service");
const about_resolver_1 = require("./about.resolver");
let AboutModule = class AboutModule {
};
exports.AboutModule = AboutModule;
exports.AboutModule = AboutModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([About_1.About])],
        providers: [about_service_1.AboutService, about_resolver_1.AboutResolver],
        exports: [about_service_1.AboutService],
    })
], AboutModule);
//# sourceMappingURL=about.module.js.map