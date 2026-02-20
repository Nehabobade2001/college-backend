"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offers1742889299644 = void 0;
class Offers1742889299644 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE offers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL DEFAULT NULL,
        offerType VARCHAR(255) NULL DEFAULT 'percentage' COMMENT 'percentage, fixed_amount',
        discountValue DECIMAL(10, 2) NULL DEFAULT 0,
        discountPercent DECIMAL(10, 2) NULL DEFAULT 0,
        usageLimit INT NOT NULL DEFAULT 1,
        status VARCHAR(255) NOT NULL DEFAULT 'active' COMMENT 'active, inactive, expired',
        startDate TIMESTAMP NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        INDEX idx_title (title)
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE offers`);
    }
}
exports.Offers1742889299644 = Offers1742889299644;
//# sourceMappingURL=1742889299644-offers.js.map