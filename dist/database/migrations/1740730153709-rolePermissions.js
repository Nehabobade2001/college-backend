"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissions1740730153709 = void 0;
class RolePermissions1740730153709 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE role_permissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            roleId INT NOT NULL,
            permissionId INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP NULL,
            FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE,
            FOREIGN KEY (permissionId) REFERENCES permissions(id) ON DELETE CASCADE
        )`);
    }
    async down(_queryRunner) {
        await _queryRunner.query(`DROP TABLE role_permissions`);
    }
}
exports.RolePermissions1740730153709 = RolePermissions1740730153709;
//# sourceMappingURL=1740730153709-rolePermissions.js.map