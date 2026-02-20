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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AboutService = void 0;
const About_1 = require("../../../entities/About");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let AboutService = class AboutService {
    constructor(aboutRepository) {
        this.aboutRepository = aboutRepository;
    }
    async getAllAbout() {
        return this.aboutRepository.find();
    }
    async create(data) {
        const newAbout = this.aboutRepository.create(data);
        return this.aboutRepository.save(newAbout);
    }
    async getAboutById(id) {
        return this.aboutRepository.findOne({ where: { id } });
    }
    async update(data) {
        await this.aboutRepository.update(data.id, data);
        return this.getAboutById(data.id);
    }
    async deleteAbout(id) {
        await this.aboutRepository.delete(id);
    }
};
exports.AboutService = AboutService;
exports.AboutService = AboutService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(About_1.About)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AboutService);
//# sourceMappingURL=about.service.js.map