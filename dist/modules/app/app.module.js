"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const ApolloConfig_1 = require("../../config/ApolloConfig");
const DatabaseConfig_1 = require("../../config/DatabaseConfig");
const users_module_1 = require("../user/users.module");
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth/auth.module");
const global_module_1 = require("../global/global.module");
const role_module_1 = require("../role/role.module");
const permission_module_1 = require("../permission/permission.module");
const about_module_1 = require("../Frontend/About/about.module");
const center_module_1 = require("../center/center.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            DatabaseConfig_1.DatabaseConfig,
            ApolloConfig_1.ApolloModule,
            global_module_1.GlobalModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            about_module_1.AboutModule,
            center_module_1.CenterModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map