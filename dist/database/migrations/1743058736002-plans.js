"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plans1743058736002 = void 0;
class Plans1743058736002 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE plans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        couponCode VARCHAR(255) NULL,
        packageId INT NOT NULL,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL DEFAULT NULL,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        duration INT NOT NULL DEFAULT 0,
        discountedPrice DECIMAL(10, 2) NOT NULL DEFAULT 0,
        status VARCHAR(255) NOT NULL DEFAULT 'active' COMMENT 'active, inactive, expired',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (packageId) REFERENCES packages (id) ON DELETE CASCADE,
        INDEX idx_name (name),
        FOREIGN KEY (couponCode) REFERENCES coupons (couponCode) ON DELETE SET NULL
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE plans`);
    }
}
exports.Plans1743058736002 = Plans1743058736002;
//# sourceMappingURL=1743058736002-plans.js.map