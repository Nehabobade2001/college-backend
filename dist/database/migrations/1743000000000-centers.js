"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Centers1743000000000 = void 0;
class Centers1743000000000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE centers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      address VARCHAR(255) NULL DEFAULT NULL,
      managerId INT NULL DEFAULT NULL,
      phone VARCHAR(255) NULL DEFAULT NULL,
      email VARCHAR(255) NULL DEFAULT NULL,
      notes TEXT NULL DEFAULT NULL,
      isActive BOOLEAN NOT NULL DEFAULT TRUE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_center_manager (managerId)
    )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE centers`);
    }
}
exports.Centers1743000000000 = Centers1743000000000;
//# sourceMappingURL=1743000000000-centers.js.map