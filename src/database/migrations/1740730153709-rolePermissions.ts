import { MigrationInterface, QueryRunner } from 'typeorm'

export class RolePermissions1740730153709 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // mariadb
    await queryRunner.query(/* sql */ `
        CREATE TABLE role_permissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            roleId INT NOT NULL,
            permissionId INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP NULL,
            FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE,
            FOREIGN KEY (permissionId) REFERENCES permissions(id) ON DELETE CASCADE
        )`)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.query(/* sql */ `DROP TABLE role_permissions`)
  }
}
