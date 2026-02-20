"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Projects1741591538698 = void 0;
class Projects1741591538698 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE projects (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT NULL DEFAULT NULL,
            status VARCHAR(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
            organizationId INT NOT NULL,
            createdById INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP NULL DEFAULT NULL,
            FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
            FOREIGN KEY (createdById) REFERENCES users(id) ON DELETE CASCADE
            )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE projects
    `);
    }
}
exports.Projects1741591538698 = Projects1741591538698;
//# sourceMappingURL=1741591538698-projects.js.map