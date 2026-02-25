import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProjects1752000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NULL,
        status ENUM('active','inactive','blocked','pending') DEFAULT 'active',
        organizationId INT NOT NULL,
        createdById INT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_projects_organization (organizationId),
        INDEX idx_projects_createdBy (createdById),
        FOREIGN KEY (organizationId) REFERENCES organizations(id) ON DELETE CASCADE,
        FOREIGN KEY (createdById) REFERENCES users(id) ON DELETE CASCADE
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS projects`)
  }
}
