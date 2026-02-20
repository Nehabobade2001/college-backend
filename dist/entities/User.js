"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUnion = exports.UserArray = exports.PaginatedUsers = exports.OtpRes = exports.RefreshRes = exports.LoginRes = exports.Otp = exports.User = exports.Designation = exports.UserType = void 0;
const withPagination_1 = require("../common/paginationDto/withPagination");
const graphql_1 = require("@nestjs/graphql");
const argon2 = __importStar(require("argon2"));
const typeorm_1 = require("typeorm");
const unique_username_generator_1 = require("unique-username-generator");
const Organization_1 = require("./Organization");
const Role_1 = require("./Role");
const UserRole_1 = require("./UserRole");
const Project_1 = require("./Project");
const Subscription_1 = require("./Subscription");
const helper_1 = require("../common/helpers/helper");
var UserType;
(function (UserType) {
    UserType["admin"] = "admin";
    UserType["adminEmployee"] = "adminEmployee";
    UserType["organization"] = "organization";
    UserType["organizationEmployee"] = "organizationEmployee";
    UserType["thirdParty"] = "thirdParty";
    UserType["thirdPartyEmployee"] = "thirdPartyEmployee";
})(UserType || (exports.UserType = UserType = {}));
(0, graphql_1.registerEnumType)(UserType, {
    name: 'UserType',
    description: 'User Type Status',
});
var Designation;
(function (Designation) {
    Designation["SUPER_ADMIN"] = "SUPER_ADMIN";
    Designation["CEO"] = "CEO";
    Designation["CTO"] = "CTO";
    Designation["HR"] = "HR";
    Designation["MANAGER"] = "MANAGER";
    Designation["TEAM_LEAD"] = "TEAM_LEAD";
    Designation["EMPLOYEE"] = "EMPLOYEE";
})(Designation || (exports.Designation = Designation = {}));
(0, graphql_1.registerEnumType)(Designation, {
    name: 'Designation',
    description: 'User Designation Hierarchy',
});
let User = class User {
    constructor() {
        this.permissions = [];
    }
    async createUsername() {
        if (!this.username) {
            const username = (0, unique_username_generator_1.generateFromEmail)(this.email, 3);
            this.username = username;
        }
    }
    async hashPassword() {
        if (this.password) {
            this.password = await argon2.hash(this.password);
        }
    }
};
exports.User = User;
User.validatePassword = async (password, hash) => {
    return await argon2.verify(hash, password);
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], User.prototype, "mobileNo", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true, default: 'avatar' }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "parentId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], User.prototype, "organizationId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Organization_1.Organization, (organization) => organization.users),
    __metadata("design:type", Organization_1.Organization)
], User.prototype, "organization", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Project_1.Project, (project) => project.createdBy),
    __metadata("design:type", Project_1.Project)
], User.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserRole_1.UserRole, (userRole) => userRole.user),
    __metadata("design:type", Array)
], User.prototype, "userRoles", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isPrimary", void 0);
__decorate([
    (0, graphql_1.Field)(() => UserType),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Subscription_1.Subscriptions, (subscription) => subscription.user),
    __metadata("design:type", Array)
], User.prototype, "subscriptions", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.DeleteDateColumn)(),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Role_1.Role], { nullable: true }),
    (0, typeorm_1.ManyToMany)(() => Role_1.Role, (role) => role.users),
    (0, typeorm_1.JoinTable)({
        name: 'user_roles',
        joinColumn: { name: 'userId' },
        inverseJoinColumn: { name: 'roleId' },
    }),
    __metadata("design:type", Array)
], User.prototype, "roles", void 0);
__decorate([
    (0, graphql_1.Field)(() => Designation, { nullable: true }),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], User.prototype, "designation", void 0);
__decorate([
    (0, graphql_1.Field)(() => User, { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => User, (user) => user.subordinates, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'parentId' }),
    __metadata("design:type", User)
], User.prototype, "parent", void 0);
__decorate([
    (0, graphql_1.Field)(() => [User], { nullable: true }),
    (0, typeorm_1.OneToMany)(() => User, (user) => user.parent),
    __metadata("design:type", Array)
], User.prototype, "subordinates", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "createUsername", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
exports.User = User = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, graphql_1.Directive)('@key(fields: "id")'),
    (0, typeorm_1.Entity)('users')
], User);
let Otp = class Otp {
    setExpiresAt() {
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);
        this.expiresAt = expiresAt;
    }
};
exports.Otp = Otp;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Otp.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Otp.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], Otp.prototype, "otp", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'varchar', default: 'login' }),
    __metadata("design:type", String)
], Otp.prototype, "otpType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Otp.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Otp.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Otp.prototype, "setExpiresAt", null);
exports.Otp = Otp = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.Directive)('@key(fields: "id")')
], Otp);
let LoginRes = class LoginRes {
};
exports.LoginRes = LoginRes;
__decorate([
    (0, graphql_1.Field)(() => User),
    __metadata("design:type", User)
], LoginRes.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoginRes.prototype, "accessToken", void 0);
exports.LoginRes = LoginRes = __decorate([
    (0, graphql_1.ObjectType)()
], LoginRes);
let RefreshRes = class RefreshRes extends LoginRes {
};
exports.RefreshRes = RefreshRes;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RefreshRes.prototype, "refreshToken", void 0);
exports.RefreshRes = RefreshRes = __decorate([
    (0, graphql_1.ObjectType)()
], RefreshRes);
let OtpRes = class OtpRes {
};
exports.OtpRes = OtpRes;
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    __metadata("design:type", Boolean)
], OtpRes.prototype, "otpGeneratedSuccessfully", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Number)
], OtpRes.prototype, "otp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OtpRes.prototype, "message", void 0);
exports.OtpRes = OtpRes = __decorate([
    (0, graphql_1.ObjectType)()
], OtpRes);
let PaginatedUsers = class PaginatedUsers extends withPagination_1.WithPagination {
};
exports.PaginatedUsers = PaginatedUsers;
__decorate([
    (0, graphql_1.Field)(() => [User]),
    __metadata("design:type", Array)
], PaginatedUsers.prototype, "data", void 0);
exports.PaginatedUsers = PaginatedUsers = __decorate([
    (0, graphql_1.ObjectType)()
], PaginatedUsers);
let UserArray = class UserArray {
};
exports.UserArray = UserArray;
__decorate([
    (0, graphql_1.Field)(() => [User]),
    __metadata("design:type", Array)
], UserArray.prototype, "data", void 0);
exports.UserArray = UserArray = __decorate([
    (0, graphql_1.ObjectType)()
], UserArray);
exports.UserUnion = (0, helper_1.createSmartUnion)('UserUnion', () => User, () => UserArray, 'data');
//# sourceMappingURL=User.js.map