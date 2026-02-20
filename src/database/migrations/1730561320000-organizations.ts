import { MigrationInterface, QueryRunner } from 'typeorm'

export class Organizations1730561320000 implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.query(/* sql */ `CREATE TABLE organizations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      status VARCHAR(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      deletedAt TIMESTAMP NULL
    )`)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.query(/* sql */ `DROP TABLE organizations`)
  }
}
