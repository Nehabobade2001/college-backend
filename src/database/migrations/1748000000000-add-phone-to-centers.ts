import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddPhoneToCenters1748000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const result: any = await queryRunner.query(`
      SELECT COUNT(*) as cnt FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'centers' AND COLUMN_NAME = 'phone'
    `)
    const cnt = Array.isArray(result) ? result[0].cnt || result[0]['COUNT(*)'] || result[0].CNT : result.cnt
    if (!cnt || Number(cnt) === 0) {
      await queryRunner.query(`ALTER TABLE centers ADD COLUMN phone VARCHAR(255) NULL DEFAULT NULL`)
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const result: any = await queryRunner.query(`
      SELECT COUNT(*) as cnt FROM INFORMATION_SCHEMA.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'centers' AND COLUMN_NAME = 'phone'
    `)
    const cnt = Array.isArray(result) ? result[0].cnt || result[0]['COUNT(*)'] || result[0].CNT : result.cnt
    if (cnt && Number(cnt) > 0) {
      await queryRunner.query(`ALTER TABLE centers DROP COLUMN phone`)
    }
  }
}
