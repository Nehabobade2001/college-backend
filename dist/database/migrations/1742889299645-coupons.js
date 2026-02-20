"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coupons1742889299645 = void 0;
class Coupons1742889299645 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE coupons (
        id INT AUTO_INCREMENT PRIMARY KEY,
        planId INT NULL DEFAULT NULL,
        couponCode VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL DEFAULT NULL,
        discountValue DECIMAL(10, 2) NULL DEFAULT 0,
        minOrderAmount DECIMAL(10, 2) NULL DEFAULT 0,
        usageLimit INT NOT NULL DEFAULT 1,
        status VARCHAR(255) NOT NULL DEFAULT 'active' COMMENT 'active, inactive, expired, used',
        startDate TIMESTAMP NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        INDEX idx_couponCode (couponCode)
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE coupons`);
    }
}
exports.Coupons1742889299645 = Coupons1742889299645;
//# sourceMappingURL=1742889299645-coupons.js.map