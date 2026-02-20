import { MigrationInterface, QueryRunner } from 'typeorm'

export class AppSetting1741245865726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* SQL */ `CREATE TABLE app_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL DEFAULT 'Admin',
        description VARCHAR(255) NOT NULL DEFAULT 'admin@gmail.com',
        logo VARCHAR(255) NULL DEFAULT NULL,
        favicon VARCHAR(255) NULL DEFAULT NULL,
        coverImage VARCHAR(255) NULL DEFAULT NULL,
        copyRight VARCHAR(255) NULL DEFAULT NULL,
        supportEmail VARCHAR(255) NULL DEFAULT NULL,
        supportPhone BIGINT NULL DEFAULT NULL,
        twoFactorAuth BOOLEAN DEFAULT FALSE,
        otpSMS BOOLEAN DEFAULT FALSE,
        otpEmail BOOLEAN DEFAULT FALSE,
        captcha BOOLEAN DEFAULT FALSE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL DEFAULT NULL
        )`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* SQL */ `DROP TABLE app_settings`)
  }
}
