import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddCenterIdToStudent1755000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'student',
      new TableColumn({
        name: 'centerId',
        type: 'int',
        isNullable: true,
      })
    )

    await queryRunner.createForeignKey(
      'student',
      new TableForeignKey({
        columnNames: ['centerId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'centers',
        onDelete: 'SET NULL',
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('student')
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('centerId') !== -1)
    
    if (foreignKey) {
      await queryRunner.dropForeignKey('student', foreignKey)
    }
    
    await queryRunner.dropColumn('student', 'centerId')
  }
}
