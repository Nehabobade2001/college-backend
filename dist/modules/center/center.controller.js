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
exports.CenterController = void 0;
const common_1 = require("@nestjs/common");
const center_service_1 = require("./center.service");
const center_dto_1 = require("./center.dto");
const jwt_guard_1 = require("../../common/auth/jwt.guard");
const PermissionDecorator_1 = require("../../common/decorators/PermissionDecorator");
let CenterController = class CenterController {
    constructor(centerService) {
        this.centerService = centerService;
    }
    async list() {
        return this.centerService.findAll();
    }
    async create(dto, req) {
        return this.centerService.create(dto, req.user);
    }
    async get(id) {
        return this.centerService.findOne(id);
    }
    async update(id, dto) {
        return this.centerService.update(id, dto);
    }
    async deactivate(id) {
        return this.centerService.deactivate(id);
    }
    async activate(id) {
        return this.centerService.activate(id);
    }
};
exports.CenterController = CenterController;
__decorate([
    (0, common_1.Get)(),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Center:Read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Center:Create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [center_dto_1.CreateCenterDto, Object]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Center:Read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Center:Update'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, center_dto_1.UpdateCenterDto]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/deactivate'),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Center:Action'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "deactivate", null);
__decorate([
    (0, common_1.Patch)(':id/activate'),
    (0, PermissionDecorator_1.Permissions)('MasterApp:Center:Action'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CenterController.prototype, "activate", null);
exports.CenterController = CenterController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('centers'),
    __metadata("design:paramtypes", [center_service_1.CenterService])
], CenterController);
//# sourceMappingURL=center.controller.js.map