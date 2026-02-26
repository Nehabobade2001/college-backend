import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateResultTables1740246000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentId INT NULL,
        courseId INT NULL,
        examName VARCHAR(100) NOT NULL,
        semester VARCHAR(50) NOT NULL,
        academicYear VARCHAR(50) NOT NULL,
        examDate DATE NOT NULL,
        totalMarks DECIMAL(5, 2) NOT NULL,
        obtainedMarks DECIMAL(5, 2) NOT NULL,
        percentage DECIMAL(5, 2) NOT NULL,
        grade VARCHAR(20) NOT NULL,
        resultType ENUM('internal', 'external', 'final') DEFAULT 'final',
        status ENUM('draft', 'published', 'unpublished') DEFAULT 'draft',
        isPublished BOOLEAN DEFAULT FALSE,
        publishedAt TIMESTAMP NULL,
        publishedBy INT NULL,
        remarks TEXT NULL,
        organizationId INT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_student (studentId),
        INDEX idx_course (courseId),
        INDEX idx_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    await queryRunner.query(/* sql */ `
      CREATE TABLE result_subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        resultId INT NOT NULL,
        subjectId INT NOT NULL,
        maxMarks DECIMAL(5, 2) NOT NULL,
        obtainedMarks DECIMAL(5, 2) NOT NULL,
        grade VARCHAR(20) NOT NULL,
        isPassed BOOLEAN DEFAULT FALSE,
        INDEX idx_result (resultId),
        INDEX idx_subject (subjectId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS result_subjects`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS results`)
  }
}