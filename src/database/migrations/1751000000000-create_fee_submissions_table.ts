import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFeeSubmissionsTable1751000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `
      CREATE TABLE IF NOT EXISTS fee_submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentFeeId INT NOT NULL,
        studentId INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        submissionType ENUM('student', 'admin', 'center') NOT NULL,
        submittedBy INT NULL,
        submittedByName VARCHAR(255) NULL,
        paymentProofUrl VARCHAR(255) NULL,
        screenshotUrl VARCHAR(255) NULL,
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        remarks TEXT NULL,
        approvedBy INT NULL,
        approvedAt TIMESTAMP NULL,
        paymentId INT NULL,
        centerId INT NULL,
        organizationId INT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_student_fee (studentFeeId),
        INDEX idx_student (studentId),
        INDEX idx_status (status),
        INDEX idx_submission_type (submissionType),
        INDEX idx_center (centerId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    await queryRunner.query(/* sql */ `
      ALTER TABLE fee_submissions
      ADD CONSTRAINT fk_fee_submissions_student_fee 
        FOREIGN KEY (studentFeeId) REFERENCES student_fees(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
      ADD CONSTRAINT fk_fee_submissions_student 
        FOREIGN KEY (studentId) REFERENCES student(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
      ADD CONSTRAINT fk_fee_submissions_payment 
        FOREIGN KEY (paymentId) REFERENCES fee_payments(id) 
        ON DELETE SET NULL ON UPDATE CASCADE
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS fee_submissions`)
  }
}
