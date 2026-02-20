"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles1730561340421 = void 0;
class Roles1730561340421 {
    async up(_queryRunner) {
        await _queryRunner.query(`CREATE TABLE roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      organizationId INT NOT NULL,
      roleType VARCHAR(255) NULL,
      isPrimary BOOLEAN NULL DEFAULT FALSE,
      status VARCHAR(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
      FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )`);
    }
    async down(_queryRunner) {
        await _queryRunner.query(`DROP TABLE roles`);
    }
}
exports.Roles1730561340421 = Roles1730561340421;
//# sourceMappingURL=1730561340421-roles.js.map