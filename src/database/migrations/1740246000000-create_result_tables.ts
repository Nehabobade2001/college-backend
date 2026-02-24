/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm'

// DISABLED - Replaced by 1749000000000-create_result_tables.ts
export class CreateResultTables1740246000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Migration disabled - moved to later timestamp to run after student table creation
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No action needed
  }
}