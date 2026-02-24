import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateFeesTables1750000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Fee Structure Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE IF NOT EXISTS fee_structures (
        id INT AUTO_INCREMENT PRIMARY KEY,
        courseId INT NOT NULL,
        academicYear VARCHAR(50) NOT NULL,
        semester INT NULL,
        year INT NULL,
        feeType ENUM('semester', 'yearly', 'one_time') DEFAULT 'semester',
        totalAmount DECIMAL(10, 2) NOT NULL,
        tuitionFee DECIMAL(10, 2) NOT NULL DEFAULT 0,
        admissionFee DECIMAL(10, 2) NOT NULL DEFAULT 0,
        examFee DECIMAL(10, 2) NOT NULL DEFAULT 0,
        libraryFee DECIMAL(10, 2) NOT NULL DEFAULT 0,
        labFee DECIMAL(10, 2) NOT NULL DEFAULT 0,
        otherFee DECIMAL(10, 2) NOT NULL DEFAULT 0,
        dueDate DATE NULL,
        lateFeeAmount DECIMAL(10, 2) DEFAULT 0,
        lateFeeApplicableAfter INT DEFAULT 0,
        status ENUM('active', 'inactive') DEFAULT 'active',
        organizationId INT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_course (courseId),
        INDEX idx_academic_year (academicYear),
        INDEX idx_status (status),
        UNIQUE KEY unique_fee_structure (courseId, academicYear, semester, year)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    await queryRunner.query(/* sql */ `
      ALTER TABLE fee_structures
      ADD CONSTRAINT fk_fee_structure_course 
        FOREIGN KEY (courseId) REFERENCES courses(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
    `)

    // Student Fee Records Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE IF NOT EXISTS student_fees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentId INT NOT NULL,
        feeStructureId INT NOT NULL,
        totalAmount DECIMAL(10, 2) NOT NULL,
        paidAmount DECIMAL(10, 2) NOT NULL DEFAULT 0,
        pendingAmount DECIMAL(10, 2) NOT NULL,
        discountAmount DECIMAL(10, 2) DEFAULT 0,
        discountReason TEXT NULL,
        lateFeeAmount DECIMAL(10, 2) DEFAULT 0,
        status ENUM('pending', 'partial', 'paid', 'overdue') DEFAULT 'pending',
        dueDate DATE NULL,
        centerId INT NULL,
        organizationId INT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_student (studentId),
        INDEX idx_fee_structure (feeStructureId),
        INDEX idx_status (status),
        INDEX idx_center (centerId),
        INDEX idx_due_date (dueDate)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    await queryRunner.query(/* sql */ `
      ALTER TABLE student_fees
      ADD CONSTRAINT fk_student_fees_student 
        FOREIGN KEY (studentId) REFERENCES student(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
      ADD CONSTRAINT fk_student_fees_structure 
        FOREIGN KEY (feeStructureId) REFERENCES fee_structures(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
    `)

    // Fee Payments Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE IF NOT EXISTS fee_payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentFeeId INT NOT NULL,
        studentId INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        paymentDate DATE NOT NULL,
        paymentMethod ENUM('cash', 'card', 'upi', 'netbanking', 'cheque', 'other') DEFAULT 'cash',
        transactionId VARCHAR(255) NULL,
        receiptNumber VARCHAR(100) NOT NULL UNIQUE,
        remarks TEXT NULL,
        collectedBy INT NULL,
        centerId INT NULL,
        organizationId INT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_student_fee (studentFeeId),
        INDEX idx_student (studentId),
        INDEX idx_payment_date (paymentDate),
        INDEX idx_center (centerId),
        INDEX idx_receipt (receiptNumber)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    await queryRunner.query(/* sql */ `
      ALTER TABLE fee_payments
      ADD CONSTRAINT fk_fee_payments_student_fee 
        FOREIGN KEY (studentFeeId) REFERENCES student_fees(id) 
        ON DELETE CASCADE ON UPDATE CASCADE,
      ADD CONSTRAINT fk_fee_payments_student 
        FOREIGN KEY (studentId) REFERENCES student(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
    `)

    // Fee Installments Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE IF NOT EXISTS fee_installments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        studentFeeId INT NOT NULL,
        installmentNumber INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        paidAmount DECIMAL(10, 2) DEFAULT 0,
        dueDate DATE NOT NULL,
        status ENUM('pending', 'paid', 'overdue') DEFAULT 'pending',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_student_fee (studentFeeId),
        INDEX idx_status (status),
        INDEX idx_due_date (dueDate)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `)

    await queryRunner.query(/* sql */ `
      ALTER TABLE fee_installments
      ADD CONSTRAINT fk_fee_installments_student_fee 
        FOREIGN KEY (studentFeeId) REFERENCES student_fees(id) 
        ON DELETE CASCADE ON UPDATE CASCADE
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS fee_installments`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS fee_payments`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS student_fees`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS fee_structures`)
  }
}
