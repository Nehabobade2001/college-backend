import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddFranchiseFieldsToCenters1746000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE centers
      ADD COLUMN franchiseName VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN ownerName VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN contactNumber VARCHAR(50) NULL DEFAULT NULL,
      ADD COLUMN alternateNumber VARCHAR(50) NULL DEFAULT NULL,
      ADD COLUMN city VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN state VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN pincode VARCHAR(50) NULL DEFAULT NULL,
      ADD COLUMN registrationNumber VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN gstNumber VARCHAR(255) NULL DEFAULT NULL,
      ADD COLUMN agreementStartDate DATE NULL DEFAULT NULL,
      ADD COLUMN agreementEndDate DATE NULL DEFAULT NULL
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE centers
      DROP COLUMN franchiseName,
      DROP COLUMN ownerName,
      DROP COLUMN contactNumber,
      DROP COLUMN alternateNumber,
      DROP COLUMN city,
      DROP COLUMN state,
      DROP COLUMN pincode,
      DROP COLUMN registrationNumber,
      DROP COLUMN gstNumber,
      DROP COLUMN agreementStartDate,
      DROP COLUMN agreementEndDate
    `)
  }
}
