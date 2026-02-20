"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packages1742889867884 = void 0;
class Packages1742889867884 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE packages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL DEFAULT NULL,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        discountedPrice DECIMAL(10, 2) NULL DEFAULT 0,
        status VARCHAR(255) NOT NULL DEFAULT 'active' COMMENT 'active, inactive, expired',
        offerType VARCHAR(255) NULL DEFAULT 'percentage' COMMENT 'percentage, fixed_amount',
        offerDescription TEXT NULL DEFAULT NULL,
        offerExpiryDate TIMESTAMP NULL DEFAULT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        INDEX idx_name (name)
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE packages
    `);
    }
}
exports.Packages1742889867884 = Packages1742889867884;
//# sourceMappingURL=1742889867884-packages.js.map