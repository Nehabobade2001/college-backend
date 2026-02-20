"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscriptions1743147163345 = void 0;
class Subscriptions1743147163345 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        organizationId INT NOT NULL,
        paymentId VARCHAR(255) NULL,
        name VARCHAR(255) NOT NULL UNIQUE,
        price DECIMAL(10, 2) NOT NULL DEFAULT 0,
        duration INT NOT NULL DEFAULT 0,
        status VARCHAR(255) NOT NULL DEFAULT 'active' COMMENT 'active, inactive, expired',
        couponCode VARCHAR(255) NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        INDEX idx_name (name),
        FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
        FOREIGN KEY (organizationId) REFERENCES organizations (id) ON DELETE CASCADE,
        FOREIGN KEY (couponCode) REFERENCES coupons (couponCode) ON DELETE SET NULL
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE subscriptions`);
    }
}
exports.Subscriptions1743147163345 = Subscriptions1743147163345;
//# sourceMappingURL=1743147163345-subscriptions.js.map