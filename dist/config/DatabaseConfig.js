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
exports.DatabaseConfig = void 0;
const EnvHelper_1 = require("../common/helpers/EnvHelper");
const typeorm_1 = require("@nestjs/typeorm");
require("./EnvConfig");
const path = __importStar(require("path"));
const config = {
    type: 'mysql',
    host: EnvHelper_1.Env.get('DB_HOST', 'localhost'),
    port: EnvHelper_1.Env.get('DB_PORT', '3306'),
    username: EnvHelper_1.Env.get('DB_USER', 'root'),
    password: EnvHelper_1.Env.get('DB_PASSWORD', ''),
    database: EnvHelper_1.Env.get('DB_NAME', 'recipes'),
    entities: [path.resolve(__dirname + '/../entities/*{.ts,.js}')],
    subscribers: [path.resolve(__dirname + '/../subscribers/*{.ts,.js}')],
    synchronize: false,
};
exports.DatabaseConfig = typeorm_1.TypeOrmModule.forRoot(config);
//# sourceMappingURL=DatabaseConfig.js.map