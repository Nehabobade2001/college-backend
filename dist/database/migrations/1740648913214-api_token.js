"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiToken1740648913214 = void 0;
class ApiToken1740648913214 {
    async up(queryRunner) {
        await queryRunner.query(`
        CREATE TABLE api_tokens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            token VARCHAR(255) NOT NULL,
            expiresAt TIMESTAMP NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES users(id)
        )`);
    }
    async down(_queryRunner) {
        await _queryRunner.query(`DROP TABLE api_tokens`);
    }
}
exports.ApiToken1740648913214 = ApiToken1740648913214;
//# sourceMappingURL=1740648913214-api_token.js.map