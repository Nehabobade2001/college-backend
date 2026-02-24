import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddStudentFields1745000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE student
      ADD COLUMN firstName VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN lastName VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN mobileNumber VARCHAR(50) NULL DEFAULT NULL,
      ADD COLUMN gender VARCHAR(50) NULL DEFAULT NULL,
      ADD COLUMN dateOfBirth DATE NULL DEFAULT NULL,
      ADD COLUMN address TEXT NULL DEFAULT NULL,
      ADD COLUMN city VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN state VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN pincode VARCHAR(50) NULL DEFAULT NULL,
      ADD COLUMN enrollmentNumber VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN courseName VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN branch VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN semester INT NULL DEFAULT NULL,
      ADD COLUMN admissionDate DATE NULL DEFAULT NULL,
      ADD COLUMN sessionYear VARCHAR(50) NULL DEFAULT NULL,
      ADD COLUMN profilePhoto VARCHAR(1024) NULL DEFAULT NULL,
      ADD COLUMN aadhaarNumber VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN previousMarksheet VARCHAR(1024) NULL DEFAULT NULL,
      ADD COLUMN category VARCHAR(100) NULL DEFAULT NULL
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE student
      DROP COLUMN firstName,
      DROP COLUMN lastName,
      DROP COLUMN mobileNumber,
      DROP COLUMN gender,
      DROP COLUMN dateOfBirth,
      DROP COLUMN address,
      DROP COLUMN city,
      DROP COLUMN state,
      DROP COLUMN pincode,
      DROP COLUMN enrollmentNumber,
      DROP COLUMN courseName,
      DROP COLUMN branch,
      DROP COLUMN semester,
      DROP COLUMN admissionDate,
      DROP COLUMN sessionYear,
      DROP COLUMN profilePhoto,
      DROP COLUMN aadhaarNumber,
      DROP COLUMN previousMarksheet,
      DROP COLUMN category
    `)
  }
}
