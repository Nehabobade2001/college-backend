import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddUserIdToStudent1754000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('student')
    const userIdColumn = table?.findColumnByName('userId')

    if (!userIdColumn) {
      await queryRunner.addColumn(
        'student',
        new TableColumn({
          name: 'userId',
          type: 'int',
          isNullable: true,
        })
      )

      await queryRunner.createForeignKey(
        'student',
        new TableForeignKey({
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'SET NULL',
        })
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('student')
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1)
    
    if (foreignKey) {
      await queryRunner.dropForeignKey('student', foreignKey)
    }
    
    await queryRunner.dropColumn('student', 'userId')
  }
}
