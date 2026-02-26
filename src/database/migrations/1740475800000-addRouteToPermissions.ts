/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddRouteToPermissions1740475800000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(/* sql */ `
      ALTER TABLE permissions
        ADD COLUMN httpMethod VARCHAR(10) NULL AFTER description,
        ADD COLUMN route VARCHAR(255) NULL AFTER httpMethod
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(/* sql */ `
      ALTER TABLE permissions
        DROP COLUMN route,
        DROP COLUMN httpMethod
    `)
    }
}
