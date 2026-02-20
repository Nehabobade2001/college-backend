import { MigrationInterface, QueryRunner } from 'typeorm'

export class Roles1730561340421 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    // mariadb
    await _queryRunner.query(/* sql */ `CREATE TABLE roles (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      organizationId INT NOT NULL,
      roleType VARCHAR(255) NULL,
      isPrimary BOOLEAN NULL DEFAULT FALSE,
      status VARCHAR(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
      FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )`)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.query(/* sql */ `DROP TABLE roles`)
  }
}
