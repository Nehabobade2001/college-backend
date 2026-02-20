import { MigrationInterface, QueryRunner } from 'typeorm'

export class Centers1743000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // MariaDB / MySQL compatible
    await queryRunner.query(/* SQL */ `CREATE TABLE centers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      address VARCHAR(255) NULL DEFAULT NULL,
      managerId INT NULL DEFAULT NULL,
      phone VARCHAR(255) NULL DEFAULT NULL,
      email VARCHAR(255) NULL DEFAULT NULL,
      notes TEXT NULL DEFAULT NULL,
      isActive BOOLEAN NOT NULL DEFAULT TRUE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_center_manager (managerId)
    )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* SQL */ `DROP TABLE centers`)
  }
}
