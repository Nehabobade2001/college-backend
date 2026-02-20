"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Otp1741247389287 = void 0;
class Otp1741247389287 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE otp (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp BIGINT NOT NULL,
        otpType VARCHAR(255) NOT NULL DEFAULT 'login',
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        expiresAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        
    )
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE otp`);
    }
}
exports.Otp1741247389287 = Otp1741247389287;
//# sourceMappingURL=1741247389287-otp.js.map