"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organizations1730561320000 = void 0;
class Organizations1730561320000 {
    async up(_queryRunner) {
        await _queryRunner.query(`CREATE TABLE organizations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )`);
    }
    async down(_queryRunner) {
        await _queryRunner.query(`DROP TABLE organizations`);
    }
}
exports.Organizations1730561320000 = Organizations1730561320000;
//# sourceMappingURL=1730561320000-organizations.js.map