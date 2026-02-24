import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateCourseTables1740245000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Courses Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NULL,
        programId INT NOT NULL,
        fees DECIMAL(10, 2) NOT NULL,
        duration INT NOT NULL,
        durationType ENUM('months', 'years', 'weeks') DEFAULT 'months',
        eligibility TEXT NULL,
        totalSeats INT NULL,
        availableSeats INT NULL,
        startDate DATE NULL,
        endDate DATE NULL,
        status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
        organizationId INT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        FOREIGN KEY (programId) REFERENCES programs(id) ON DELETE CASCADE,
        INDEX idx_program (programId),
        INDEX idx_status (status),
        INDEX idx_code (code)
      )
    `)

    // Create Course-Subjects Junction Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE course_subjects (
        courseId INT NOT NULL,
        subjectId INT NOT NULL,
        PRIMARY KEY (courseId, subjectId),
        FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
        FOREIGN KEY (subjectId) REFERENCES subjects(id) ON DELETE CASCADE,
        INDEX idx_course (courseId),
        INDEX idx_subject (subjectId)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS course_subjects`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS courses`)
  }
}
