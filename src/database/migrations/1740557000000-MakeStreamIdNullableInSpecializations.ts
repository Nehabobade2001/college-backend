import { MigrationInterface, QueryRunner } from 'typeorm'

export class MakeStreamIdNullableInSpecializations1740557000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE specializations DROP FOREIGN KEY specializations_ibfk_1`,
    )
    await queryRunner.query(
      `ALTER TABLE specializations MODIFY streamId INT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE specializations ADD CONSTRAINT specializations_ibfk_1 FOREIGN KEY (streamId) REFERENCES streams(id) ON DELETE CASCADE`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE specializations DROP FOREIGN KEY specializations_ibfk_1`,
    )
    await queryRunner.query(
      `ALTER TABLE specializations MODIFY streamId INT NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE specializations ADD CONSTRAINT specializations_ibfk_1 FOREIGN KEY (streamId) REFERENCES streams(id) ON DELETE CASCADE`,
    )
  }
}
