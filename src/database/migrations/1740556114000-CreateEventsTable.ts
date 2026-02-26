/* eslint-disable prettier/prettier */
import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateEventsTable1740556114000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE events (
        id INT AUTO_INCREMENT PRIMARY KEY,

        title VARCHAR(255) NOT NULL,
        description TEXT NULL,

        type ENUM('NOTICE', 'EVENT', 'HOLIDAY', 'ANNOUNCEMENT') 
          DEFAULT 'NOTICE',

        priority ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT') 
          DEFAULT 'MEDIUM',

        status ENUM('DRAFT', 'PUBLISHED', 'ARCHIVED') 
          DEFAULT 'DRAFT',

        startDate DATE NOT NULL,
        endDate DATE NULL,

        centerIds TEXT NULL,
        studentIds TEXT NULL,

        attachmentUrl VARCHAR(500) NULL,

        createdBy INT NOT NULL,

        organizationId INT NULL,

        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
          ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,

        FOREIGN KEY (createdBy) REFERENCES users(id) 
          ON DELETE CASCADE,

        INDEX idx_event_type (type),
        INDEX idx_event_status (status),
        INDEX idx_event_startDate (startDate),
        INDEX idx_event_createdBy (createdBy)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS events`)
  }
}