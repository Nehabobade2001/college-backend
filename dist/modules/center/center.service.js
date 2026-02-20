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
var CenterService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CenterService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Center_1 = require("../../entities/Center");
const User_1 = require("../../entities/User");
const Role_1 = require("../../entities/Role");
const UserRole_1 = require("../../entities/UserRole");
const mail_service_1 = require("../global/mail.service");
const crypto_1 = require("crypto");
let CenterService = CenterService_1 = class CenterService {
    constructor(centerRepo, mailService) {
        this.centerRepo = centerRepo;
        this.mailService = mailService;
        this.logger = new common_1.Logger(CenterService_1.name);
    }
    async findAll() {
        return this.centerRepo.find();
    }
    async findOne(id) {
        return this.centerRepo.findOne({ where: { id } });
    }
    async create(dto, authUser) {
        const center = this.centerRepo.create(dto);
        const savedCenter = await this.centerRepo.save(center);
        try {
            if (dto.email) {
                const userRepo = this.centerRepo.manager.getRepository(User_1.User);
                let passwordToUse;
                if (dto.password) {
                    if (!dto.confirmPassword || dto.password !== dto.confirmPassword) {
                        throw new common_1.BadRequestException('Password and confirmPassword must match');
                    }
                    passwordToUse = dto.password;
                }
                else {
                    passwordToUse = (0, crypto_1.randomBytes)(6).toString('hex');
                }
                const orgId = authUser?.organizationId;
                if (!orgId) {
                    this.logger.warn('No organizationId found on authUser — skipping center user creation to avoid FK constraint.');
                }
                else {
                    const newUser = userRepo.create({
                        name: dto.name,
                        email: dto.email,
                        password: passwordToUse,
                        status: 'active',
                        organizationId: orgId,
                    });
                    const savedUser = await userRepo.save(newUser);
                    try {
                        const roleRepo = this.centerRepo.manager.getRepository(Role_1.Role);
                        let franchiseRole = (await roleRepo.findOne({ where: { name: 'Franchise', organizationId: savedUser.organizationId } }));
                        if (!franchiseRole) {
                            franchiseRole = roleRepo.create({
                                name: 'Franchise',
                                organizationId: savedUser.organizationId,
                                description: 'Franchise Role',
                                isPrimary: false,
                                roleType: 'franchise',
                                status: 'active',
                                permissionCount: 0,
                            });
                            franchiseRole = await roleRepo.save(franchiseRole);
                        }
                        const userRoleRepo = this.centerRepo.manager.getRepository(UserRole_1.UserRole);
                        const userRole = userRoleRepo.create({ roleId: franchiseRole.id, userId: savedUser.id });
                        await userRoleRepo.save(userRole);
                    }
                    catch (e) {
                        this.logger.warn('Failed to assign Franchise role to center user', e);
                    }
                    try {
                        const fileContent = `Login credentials\nEmail: ${dto.email}\nPassword: ${passwordToUse}\nPlease change your password after first login.`;
                        const attachments = [
                            {
                                filename: 'credentials.txt',
                                content: fileContent,
                            },
                        ];
                        await this.mailService.sendWelcomeWithAttachment(dto.email, { name: dto.name, email: dto.email }, {}, attachments);
                    }
                    catch (e) {
                        this.logger.warn('Failed to send credentials attachment for center user', e);
                    }
                }
            }
        }
        catch (err) {
            this.logger.error('Error creating center user', err);
        }
        return savedCenter;
    }
    async update(id, dto) {
        await this.centerRepo.update(id, dto);
        return this.findOne(id);
    }
    async deactivate(id) {
        await this.centerRepo.update(id, { isActive: false });
        return this.findOne(id);
    }
    async activate(id) {
        await this.centerRepo.update(id, { isActive: true });
        return this.findOne(id);
    }
};
exports.CenterService = CenterService;
exports.CenterService = CenterService = CenterService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Center_1.Center)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService])
], CenterService);
//# sourceMappingURL=center.service.js.map