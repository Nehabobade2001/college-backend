"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const EnvHelper_1 = require("../common/helpers/EnvHelper");
require("./EnvConfig");
const config = {
    type: 'mysql',
    host: EnvHelper_1.Env.get('DB_HOST', 'localhost'),
    port: EnvHelper_1.Env.get('DB_PORT', '3306'),
    username: EnvHelper_1.Env.get('DB_USER', 'root'),
    password: EnvHelper_1.Env.get('DB_PASSWORD', ''),
    database: EnvHelper_1.Env.get('DB_NAME', 'recipes'),
    entities: ['./src/entities/*.ts'],
    migrations: ['./src/database/migrations/*.ts'],
    synchronize: false,
};
const AppDataSource = new typeorm_1.DataSource(config);
exports.default = AppDataSource;
//# sourceMappingURL=DataSource.js.map