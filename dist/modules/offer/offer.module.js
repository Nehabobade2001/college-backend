"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferModule = void 0;
const Offer_1 = require("../../entities/Offer");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const offer_resolver_1 = require("./offer.resolver");
const offer_service_1 = require("./offer.service");
let OfferModule = class OfferModule {
};
exports.OfferModule = OfferModule;
exports.OfferModule = OfferModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([Offer_1.Offer])],
        providers: [offer_service_1.OfferService, offer_resolver_1.OfferResolver],
        exports: [offer_service_1.OfferService],
    })
], OfferModule);
//# sourceMappingURL=offer.module.js.map