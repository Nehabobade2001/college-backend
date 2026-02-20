"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions1730561332780 = void 0;
class Permissions1730561332780 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        appName VARCHAR(255) NOT NULL,
        groupName VARCHAR(255) NOT NULL,
        module VARCHAR(255) NOT NULL,
        action VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        description TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL
        )`);
    }
    async down(_queryRunner) {
        await _queryRunner.query(`DROP TABLE permissions`);
    }
}
exports.Permissions1730561332780 = Permissions1730561332780;
//# sourceMappingURL=1730561332780-permissions.js.map