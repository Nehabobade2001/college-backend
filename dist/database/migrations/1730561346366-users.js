"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1730561346366 = void 0;
class Users1730561346366 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        mobileNo BIGINT NULL DEFAULT NULL,
        password VARCHAR(255) NOT NULL,
        status VARCHAR(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
        userType VARCHAR(255) NOT NULL DEFAULT 'organizationEmployee' COMMENT 'admin, adminEmployee, organization, organizationEmployee',
        designation VARCHAR(255) NULL DEFAULT NULL COMMENT 'SUPER_ADMIN, CEO, CTO, HR, MANAGER, TEAM_LEAD, EMPLOYEE',
        avatar VARCHAR(255) NULL DEFAULT 'avatar',
        parentId INT NULL DEFAULT NULL,
        organizationId INT NOT NULL,
        isPrimary BOOLEAN NULL DEFAULT FALSE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_user_email (username, email),
        INDEX idx_org_id (organizationId),
        INDEX idx_parent_id (parentId),
        FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
        FOREIGN KEY (parentId) REFERENCES users(id) ON DELETE SET NULL
      )`);
    }
    async down(_queryRunner) {
        await _queryRunner.query(`DROP TABLE users`);
    }
}
exports.Users1730561346366 = Users1730561346366;
//# sourceMappingURL=1730561346366-users.js.map