"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization1730561332779 = void 0;
class Organization1730561332779 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE organizations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL DEFAULT NULL,
        status VARCHAR(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_name (name)
        )`);
    }
    async down(_queryRunner) {
        await _queryRunner.query(`DROP TABLE organizations `);
    }
}
exports.Organization1730561332779 = Organization1730561332779;
//# sourceMappingURL=1730561332779-organization.js.map