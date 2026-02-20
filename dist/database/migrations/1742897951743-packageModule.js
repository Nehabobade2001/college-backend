"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageModule1742897951743 = void 0;
class PackageModule1742897951743 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE package_modules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        packageId INT NOT NULL,
        moduleId INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        FOREIGN KEY (packageId) REFERENCES packages (id) ON DELETE CASCADE,
        FOREIGN KEY (moduleId) REFERENCES modules (id) ON DELETE CASCADE
      )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE package
    `);
    }
}
exports.PackageModule1742897951743 = PackageModule1742897951743;
//# sourceMappingURL=1742897951743-packageModule.js.map