import { MigrationInterface, QueryRunner } from 'typeorm'

export class Modules1742889299643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `CREATE TABLE modules (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        description TEXT NULL DEFAULT NULL,
        status VARCHAR(255) NOT NULL DEFAULT 'active' COMMENT 'active, inactive',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL,
        INDEX idx_name (name)
      )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE modules
    `)
  }
}
