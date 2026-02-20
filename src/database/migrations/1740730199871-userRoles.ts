import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserRoles1740730199871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // mariadb
    await queryRunner.query(/* sql */ `
        CREATE TABLE user_roles (
            id INT AUTO_INCREMENT PRIMARY KEY,
            userId INT NOT NULL,
            roleId INT NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            deletedAt TIMESTAMP NULL,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (roleId) REFERENCES roles(id) ON DELETE CASCADE
        )`)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    await _queryRunner.query(/* sql */ `DROP TABLE user_roles`)
  }
}
