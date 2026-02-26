import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddStudentFieldsToUsers1753500000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const columns = [
      { name: 'gender', type: 'varchar', isNullable: true },
      { name: 'dateOfBirth', type: 'date', isNullable: true },
      { name: 'address', type: 'text', isNullable: true },
      { name: 'city', type: 'varchar', isNullable: true },
      { name: 'state', type: 'varchar', isNullable: true },
      { name: 'pincode', type: 'varchar', isNullable: true },
      { name: 'enrollmentNumber', type: 'varchar', isNullable: true },
      { name: 'courseName', type: 'varchar', isNullable: true },
      { name: 'branch', type: 'varchar', isNullable: true },
      { name: 'semester', type: 'int', isNullable: true },
      { name: 'admissionDate', type: 'date', isNullable: true },
      { name: 'sessionYear', type: 'varchar', isNullable: true },
      { name: 'profilePhoto', type: 'varchar', isNullable: true },
      { name: 'aadhaarNumber', type: 'varchar', isNullable: true },
      { name: 'qualification', type: 'varchar', isNullable: true },
      { name: 'percentage', type: 'float', isNullable: true },
      { name: 'documentUrl', type: 'varchar', isNullable: true },
      { name: 'previousMarksheet', type: 'varchar', isNullable: true },
      { name: 'category', type: 'varchar', isNullable: true },
    ]

    for (const col of columns) {
      await queryRunner.addColumn('users', new TableColumn(col))
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const columnNames = [
      'gender', 'dateOfBirth', 'address', 'city', 'state', 'pincode',
      'enrollmentNumber', 'courseName', 'branch', 'semester', 'admissionDate',
      'sessionYear', 'profilePhoto', 'aadhaarNumber', 'qualification',
      'percentage', 'documentUrl', 'previousMarksheet', 'category'
    ]

    for (const name of columnNames) {
      await queryRunner.dropColumn('users', name)
    }
  }
}
