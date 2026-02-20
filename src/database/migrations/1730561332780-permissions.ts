import { MigrationInterface, QueryRunner } from 'typeorm'

export class Permissions1730561332780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // MariaDB
    await queryRunner.query(/* SQL */ `CREATE TABLE permissions (
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
        )`)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.query(/* SQL */ `DROP TABLE permissions`)
  }
}
