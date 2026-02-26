import { MigrationInterface, QueryRunner } from 'typeorm'

export class MasterManagementTables1740243000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Categories Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_status (status),
        INDEX idx_code (code)
      )
    `)

    // 2. Departments Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE departments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NULL,
        categoryId INT NOT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE CASCADE,
        INDEX idx_category (categoryId),
        INDEX idx_status (status)
      )
    `)

    // 3. Programs Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE programs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NULL,
        duration INT NULL,
        durationType VARCHAR(50) NULL,
        departmentId INT NOT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        FOREIGN KEY (departmentId) REFERENCES departments(id) ON DELETE CASCADE,
        INDEX idx_department (departmentId),
        INDEX idx_status (status)
      )
    `)

    // 4. Streams Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE streams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NULL,
        programId INT NOT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        FOREIGN KEY (programId) REFERENCES programs(id) ON DELETE CASCADE,
        INDEX idx_program (programId),
        INDEX idx_status (status)
      )
    `)

    // 5. Specializations Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE specializations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NULL,
        streamId INT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        FOREIGN KEY (streamId) REFERENCES streams(id) ON DELETE CASCADE,
        INDEX idx_stream (streamId),
        INDEX idx_status (status)
      )
    `)

    // 6. Subjects Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE subjects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(100) NOT NULL UNIQUE,
        description TEXT NULL,
        type ENUM('theory', 'practical', 'both') DEFAULT 'theory',
        credits INT NULL,
        maxMarks INT NULL,
        minMarks INT NULL,
        status ENUM('active', 'inactive') DEFAULT 'active',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_status (status),
        INDEX idx_type (type)
      )
    `)

    // 7. Addresses Table
    await queryRunner.query(/* sql */ `
      CREATE TABLE addresses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        addressLine1 VARCHAR(255) NOT NULL,
        addressLine2 VARCHAR(255) NULL,
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        country VARCHAR(100) NOT NULL,
        pincode VARCHAR(20) NOT NULL,
        type ENUM('permanent', 'current', 'office', 'other') DEFAULT 'current',
        landmark VARCHAR(50) NULL,
        latitude DECIMAL(10, 8) NULL,
        longitude DECIMAL(11, 8) NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deletedAt TIMESTAMP NULL,
        INDEX idx_type (type),
        INDEX idx_pincode (pincode)
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS addresses`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS subjects`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS specializations`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS streams`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS programs`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS departments`)
    await queryRunner.query(/* sql */ `DROP TABLE IF EXISTS categories`)
  }
}
