"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles1740730199871 = void 0;
class UserRoles1740730199871 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE user_roles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            roleId INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP NULL,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
        )`);
    }
    async down(_queryRunner) {
        await _queryRunner.query(`DROP TABLE user_roles`);
    }
}
exports.UserRoles1740730199871 = UserRoles1740730199871;
//# sourceMappingURL=1740730199871-userRoles.js.map