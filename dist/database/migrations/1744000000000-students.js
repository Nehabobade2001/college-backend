"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Students1744000000000 = void 0;
class Students1744000000000 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE student (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NULL DEFAULT NULL UNIQUE,
      password VARCHAR(255) NULL DEFAULT NULL,
      isMe BOOLEAN NOT NULL DEFAULT FALSE,
      organizationId INT NULL DEFAULT NULL,
      status VARCHAR(50) NOT NULL DEFAULT 'active',
      isActive BOOLEAN NOT NULL DEFAULT TRUE,
      qualification VARCHAR(255) NULL DEFAULT NULL,
      percentage DOUBLE NULL DEFAULT NULL,
      documentUrl VARCHAR(1024) NULL DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_student_organization (organizationId)
    )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE student`);
    }
}
exports.Students1744000000000 = Students1744000000000;
//# sourceMappingURL=1744000000000-students.js.map