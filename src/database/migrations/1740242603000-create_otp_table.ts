import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateOtpTable1740242603000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE otp (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        otp VARCHAR(10) NOT NULL,
        otpType ENUM('login', 'forgot_password', 'verify_email', 'verify_phone') DEFAULT 'login',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expiresAt TIMESTAMP NULL,
        INDEX idx_email (email),
        INDEX idx_created_at (createdAt)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS otp`)
  }
}
