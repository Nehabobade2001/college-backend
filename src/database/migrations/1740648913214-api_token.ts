import { MigrationInterface, QueryRunner } from 'typeorm'

export class ApiToken1740648913214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // mariadb
    await queryRunner.query(/* sql */ `
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
        )`)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.query(/* sql */ `DROP TABLE api_tokens`)
  }
}
