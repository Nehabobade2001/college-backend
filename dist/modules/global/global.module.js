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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const apiToken_service_1 = require("../auth/apiToken.service");
const typeorm_1 = require("@nestjs/typeorm");
const ApiToken_1 = require("../../entities/ApiToken");
const User_1 = require("../../entities/User");
const mailer_1 = require("@nestjs-modules/mailer");
const path = __importStar(require("path"));
const mjml_adapter_1 = require("../../common/adapter/mjml.adapter");
const AppSetting_1 = require("../../entities/AppSetting");
const mail_service_1 = require("./mail.service");
const otp_service_1 = require("./otp.service");
const fileUpload_module_1 = require("../fileUpload/fileUpload.module");
let GlobalModule = class GlobalModule {
};
exports.GlobalModule = GlobalModule;
exports.GlobalModule = GlobalModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                },
                defaults: {
                    from: process.env.EMAIL_FROM,
                },
                template: {
                    dir: path.join(process.cwd(), 'src', 'templates'),
                    adapter: new mjml_adapter_1.MJMLAdapter(),
                    options: {
                        strict: true,
                        partials: {
                            dir: path.join(process.cwd(), 'src', 'templates', 'partials'),
                            options: {
                                strict: true,
                            },
                        },
                    },
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([User_1.User, ApiToken_1.ApiToken, User_1.Otp, AppSetting_1.AppSetting]),
            fileUpload_module_1.FileUploadModule,
        ],
        providers: [jwt_1.JwtService, apiToken_service_1.ApiTokenService, otp_service_1.OtpService, mail_service_1.MailService],
        exports: [
            jwt_1.JwtService,
            typeorm_1.TypeOrmModule,
            apiToken_service_1.ApiTokenService,
            mailer_1.MailerModule,
            mail_service_1.MailService,
            otp_service_1.OtpService,
        ],
    })
], GlobalModule);
//# sourceMappingURL=global.module.js.map