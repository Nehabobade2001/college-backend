import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateComplaintsTable1740558000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'complaints',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
            default: "'OPEN'",
          },
          {
            name: 'priority',
            type: 'enum',
            enum: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
            default: "'MEDIUM'",
          },
          {
            name: 'studentId',
            type: 'int',
          },
          {
            name: 'centerId',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'assignedTo',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'resolution',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'resolvedAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    )

    await queryRunner.query(
      `CREATE INDEX idx_complaints_status ON complaints(status)`,
    )
    await queryRunner.query(
      `CREATE INDEX idx_complaints_student ON complaints(studentId)`,
    )
    await queryRunner.query(
      `CREATE INDEX idx_complaints_center ON complaints(centerId)`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX idx_complaints_center ON complaints`)
    await queryRunner.query(`DROP INDEX idx_complaints_student ON complaints`)
    await queryRunner.query(`DROP INDEX idx_complaints_status ON complaints`)
    await queryRunner.dropTable('complaints')
  }
}
