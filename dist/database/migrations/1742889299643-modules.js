"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modules1742889299643 = void 0;
class Modules1742889299643 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE modules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL DEFAULT NULL,
        status VARCHAR(255) NOT NULL DEFAULT 'active' COMMENT 'active, inactive',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        INDEX idx_name (name)
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE modules
    `);
    }
}
exports.Modules1742889299643 = Modules1742889299643;
//# sourceMappingURL=1742889299643-modules.js.map