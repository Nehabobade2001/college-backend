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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DataSource_1 = __importDefault(require("../config/DataSource"));
const common_1 = require("@nestjs/common");
const seeders = __importStar(require("./seeders/index"));
async function RunMigrations() {
    const dataSource = DataSource_1.default;
    try {
        const shouldSeed = process.argv.includes('--seed');
        await dataSource.initialize();
        common_1.Logger.log('Database connected successfully...', 'Migration');
        const pendingMigrations = await dataSource.runMigrations({
            transaction: 'all',
        });
        if (pendingMigrations.length > 0) {
            common_1.Logger.log(`Running ${pendingMigrations.length} pending migrations...`, 'Migration');
            pendingMigrations.forEach((migration, i) => {
                common_1.Logger.log(`#${i + 1}: ${migration.name} has been run...`, 'Migration');
            });
        }
        else {
            common_1.Logger.log('No pending migrations to run.', 'Migration');
        }
        common_1.Logger.log('Migrations Executed successfully.', 'Migration');
        if (shouldSeed) {
            await seed(dataSource);
        }
    }
    catch (error) {
        common_1.Logger.error('Error running migrations:', error?.stack, 'Migration');
    }
    finally {
        await dataSource.destroy();
    }
}
const seed = async (AppDataSource) => {
    try {
        common_1.Logger.log(`Running ${Object.keys(seeders).length} seeders...`, 'Seeder');
        for (const seeder of Object.values(seeders)) {
            await seeder(AppDataSource);
            common_1.Logger.log(`${seeder.name} executed successfully.`, 'Seeder');
        }
        common_1.Logger.log('Seeders executed successfully.', 'Seeder');
    }
    catch (error) {
        common_1.Logger.error('Error running seeders:', error?.stack, 'Seeder');
    }
};
RunMigrations();
//# sourceMappingURL=RunMigrations.js.map