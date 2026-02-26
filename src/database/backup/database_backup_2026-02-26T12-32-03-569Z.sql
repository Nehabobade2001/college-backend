-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: collage
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `addressLine1` varchar(255) NOT NULL,
  `addressLine2` varchar(255) DEFAULT NULL,
  `city` varchar(100) NOT NULL,
  `state` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `pincode` varchar(20) NOT NULL,
  `type` enum('permanent','current','office','other') DEFAULT 'current',
  `landmark` varchar(50) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_type` (`type`),
  KEY `idx_pincode` (`pincode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `api_tokens`
--

DROP TABLE IF EXISTS `api_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `api_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiresAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `api_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_tokens`
--

LOCK TABLES `api_tokens` WRITE;
/*!40000 ALTER TABLE `api_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app_settings`
--

DROP TABLE IF EXISTS `app_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `app_settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT 'Admin',
  `description` varchar(255) NOT NULL DEFAULT 'admin@gmail.com',
  `logo` varchar(255) DEFAULT NULL,
  `favicon` varchar(255) DEFAULT NULL,
  `coverImage` varchar(255) DEFAULT NULL,
  `copyRight` varchar(255) DEFAULT NULL,
  `supportEmail` varchar(255) DEFAULT NULL,
  `supportPhone` bigint(20) DEFAULT NULL,
  `twoFactorAuth` tinyint(1) DEFAULT 0,
  `otpSMS` tinyint(1) DEFAULT 0,
  `otpEmail` tinyint(1) DEFAULT 0,
  `captcha` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_settings`
--

LOCK TABLES `app_settings` WRITE;
/*!40000 ALTER TABLE `app_settings` DISABLE KEYS */;
INSERT INTO `app_settings` VALUES (1,'Admin Application','Admin Application Software','/public/uploads/1735040504980.png','/public/uploads/1735040504980.png','/public/uploads/1735040504985.jpg','© 2024-25','support@gmail.com',9876543210,1,0,1,0,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL);
/*!40000 ALTER TABLE `app_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_status` (`status`),
  KEY `idx_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centers`
--

DROP TABLE IF EXISTS `centers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `centers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `managerId` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `franchiseName` varchar(255) DEFAULT NULL,
  `ownerName` varchar(255) DEFAULT NULL,
  `contactNumber` varchar(50) DEFAULT NULL,
  `alternateNumber` varchar(50) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(50) DEFAULT NULL,
  `registrationNumber` varchar(255) DEFAULT NULL,
  `gstNumber` varchar(255) DEFAULT NULL,
  `agreementStartDate` date DEFAULT NULL,
  `agreementEndDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_center_manager` (`managerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centers`
--

LOCK TABLES `centers` WRITE;
/*!40000 ALTER TABLE `centers` DISABLE KEYS */;
/*!40000 ALTER TABLE `centers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('OPEN','IN_PROGRESS','RESOLVED','CLOSED') NOT NULL DEFAULT 'OPEN',
  `priority` enum('LOW','MEDIUM','HIGH','URGENT') NOT NULL DEFAULT 'MEDIUM',
  `studentId` int(11) NOT NULL,
  `centerId` int(11) DEFAULT NULL,
  `assignedTo` int(11) DEFAULT NULL,
  `resolution` text DEFAULT NULL,
  `resolvedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_complaints_status` (`status`),
  KEY `idx_complaints_student` (`studentId`),
  KEY `idx_complaints_center` (`centerId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_subjects`
--

DROP TABLE IF EXISTS `course_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_subjects` (
  `courseId` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  PRIMARY KEY (`courseId`,`subjectId`),
  KEY `idx_course` (`courseId`),
  KEY `idx_subject` (`subjectId`),
  CONSTRAINT `course_subjects_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE,
  CONSTRAINT `course_subjects_ibfk_2` FOREIGN KEY (`subjectId`) REFERENCES `subjects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_subjects`
--

LOCK TABLES `course_subjects` WRITE;
/*!40000 ALTER TABLE `course_subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `programId` int(11) NOT NULL,
  `fees` decimal(10,2) NOT NULL,
  `duration` int(11) NOT NULL,
  `durationType` enum('months','years','weeks') DEFAULT 'months',
  `eligibility` text DEFAULT NULL,
  `totalSeats` int(11) DEFAULT NULL,
  `availableSeats` int(11) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `status` enum('active','inactive','draft') DEFAULT 'active',
  `organizationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_program` (`programId`),
  KEY `idx_status` (`status`),
  KEY `idx_code` (`code`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`programId`) REFERENCES `programs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `categoryId` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_category` (`categoryId`),
  KEY `idx_status` (`status`),
  CONSTRAINT `departments_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `type` enum('NOTICE','EVENT','HOLIDAY','ANNOUNCEMENT') DEFAULT 'NOTICE',
  `priority` enum('LOW','MEDIUM','HIGH','URGENT') DEFAULT 'MEDIUM',
  `status` enum('DRAFT','PUBLISHED','ARCHIVED') DEFAULT 'DRAFT',
  `startDate` date NOT NULL,
  `endDate` date DEFAULT NULL,
  `centerIds` text DEFAULT NULL,
  `studentIds` text DEFAULT NULL,
  `attachmentUrl` varchar(500) DEFAULT NULL,
  `createdBy` int(11) NOT NULL,
  `organizationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_event_type` (`type`),
  KEY `idx_event_status` (`status`),
  KEY `idx_event_startDate` (`startDate`),
  KEY `idx_event_createdBy` (`createdBy`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`createdBy`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee_installments`
--

DROP TABLE IF EXISTS `fee_installments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee_installments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentFeeId` int(11) NOT NULL,
  `installmentNumber` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paidAmount` decimal(10,2) DEFAULT 0.00,
  `dueDate` date NOT NULL,
  `status` enum('pending','paid','overdue') DEFAULT 'pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_student_fee` (`studentFeeId`),
  KEY `idx_status` (`status`),
  KEY `idx_due_date` (`dueDate`),
  CONSTRAINT `fk_fee_installments_student_fee` FOREIGN KEY (`studentFeeId`) REFERENCES `student_fees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee_installments`
--

LOCK TABLES `fee_installments` WRITE;
/*!40000 ALTER TABLE `fee_installments` DISABLE KEYS */;
/*!40000 ALTER TABLE `fee_installments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee_payments`
--

DROP TABLE IF EXISTS `fee_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentFeeId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentDate` date NOT NULL,
  `paymentMethod` enum('cash','card','upi','netbanking','cheque','other') DEFAULT 'cash',
  `transactionId` varchar(255) DEFAULT NULL,
  `receiptNumber` varchar(100) NOT NULL,
  `remarks` text DEFAULT NULL,
  `collectedBy` int(11) DEFAULT NULL,
  `centerId` int(11) DEFAULT NULL,
  `organizationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receiptNumber` (`receiptNumber`),
  KEY `idx_student_fee` (`studentFeeId`),
  KEY `idx_student` (`studentId`),
  KEY `idx_payment_date` (`paymentDate`),
  KEY `idx_center` (`centerId`),
  KEY `idx_receipt` (`receiptNumber`),
  CONSTRAINT `fk_fee_payments_student` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fee_payments_student_fee` FOREIGN KEY (`studentFeeId`) REFERENCES `student_fees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee_payments`
--

LOCK TABLES `fee_payments` WRITE;
/*!40000 ALTER TABLE `fee_payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `fee_payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee_structures`
--

DROP TABLE IF EXISTS `fee_structures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee_structures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseId` int(11) NOT NULL,
  `academicYear` varchar(50) NOT NULL,
  `semester` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `feeType` enum('semester','yearly','one_time') DEFAULT 'semester',
  `totalAmount` decimal(10,2) NOT NULL,
  `tuitionFee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `admissionFee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `examFee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `libraryFee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `labFee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `otherFee` decimal(10,2) NOT NULL DEFAULT 0.00,
  `dueDate` date DEFAULT NULL,
  `lateFeeAmount` decimal(10,2) DEFAULT 0.00,
  `lateFeeApplicableAfter` int(11) DEFAULT 0,
  `status` enum('active','inactive') DEFAULT 'active',
  `organizationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_fee_structure` (`courseId`,`academicYear`,`semester`,`year`),
  KEY `idx_course` (`courseId`),
  KEY `idx_academic_year` (`academicYear`),
  KEY `idx_status` (`status`),
  CONSTRAINT `fk_fee_structure_course` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee_structures`
--

LOCK TABLES `fee_structures` WRITE;
/*!40000 ALTER TABLE `fee_structures` DISABLE KEYS */;
/*!40000 ALTER TABLE `fee_structures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fee_submissions`
--

DROP TABLE IF EXISTS `fee_submissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fee_submissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentFeeId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `submissionType` enum('student','admin','center') NOT NULL,
  `submittedBy` int(11) DEFAULT NULL,
  `submittedByName` varchar(255) DEFAULT NULL,
  `paymentProofUrl` varchar(255) DEFAULT NULL,
  `screenshotUrl` varchar(255) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `remarks` text DEFAULT NULL,
  `approvedBy` int(11) DEFAULT NULL,
  `approvedAt` timestamp NULL DEFAULT NULL,
  `paymentId` int(11) DEFAULT NULL,
  `centerId` int(11) DEFAULT NULL,
  `organizationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_student_fee` (`studentFeeId`),
  KEY `idx_student` (`studentId`),
  KEY `idx_status` (`status`),
  KEY `idx_submission_type` (`submissionType`),
  KEY `idx_center` (`centerId`),
  KEY `fk_fee_submissions_payment` (`paymentId`),
  CONSTRAINT `fk_fee_submissions_payment` FOREIGN KEY (`paymentId`) REFERENCES `fee_payments` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_fee_submissions_student` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_fee_submissions_student_fee` FOREIGN KEY (`studentFeeId`) REFERENCES `student_fees` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fee_submissions`
--

LOCK TABLES `fee_submissions` WRITE;
/*!40000 ALTER TABLE `fee_submissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `fee_submissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1730561320000,'Organizations1730561320000'),(2,1730561332780,'Permissions1730561332780'),(3,1730561340421,'Roles1730561340421'),(4,1730561346366,'Users1730561346366'),(5,1740242603000,'CreateOtpTable1740242603000'),(6,1740243000000,'MasterManagementTables1740243000000'),(7,1740245000000,'CreateCourseTables1740245000000'),(8,1740246000000,'CreateResultTables1740246000000'),(9,1740475800000,'AddRouteToPermissions1740475800000'),(10,1740556114000,'CreateEventsTable1740556114000'),(11,1740557000000,'MakeStreamIdNullableInSpecializations1740557000000'),(12,1740558000000,'CreateComplaintsTable1740558000000'),(13,1740648913214,'ApiToken1740648913214'),(14,1740730153709,'RolePermissions1740730153709'),(15,1740730199871,'UserRoles1740730199871'),(16,1741245865726,'AppSetting1741245865726'),(17,1742889299643,'Modules1742889299643'),(18,1743000000000,'Centers1743000000000'),(19,1744000000000,'Students1744000000000'),(20,1745000000000,'AddStudentFields1745000000000'),(21,1746000000000,'AddFranchiseFieldsToCenters1746000000000'),(22,1747000000000,'AddAddressToCenters1747000000000'),(23,1748000000000,'AddPhoneToCenters1748000000000'),(24,1750000000000,'CreateFeesTables1750000000000'),(25,1751000000000,'CreateFeeSubmissionsTable1751000000000'),(26,1752000000000,'CreateProjects1752000000000'),(27,1754000000000,'AddUserIdToStudent1754000000000'),(28,1755000000000,'AddCenterIdToStudent1755000000000'),(29,1753500000000,'AddStudentFieldsToUsers1753500000000');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active' COMMENT 'active, inactive',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (2,'Test Organization','Test Organization Description','pending','2026-02-26 12:31:26','2026-02-26 12:31:26',NULL);
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `otp` varchar(10) NOT NULL,
  `otpType` enum('login','forgot_password','verify_email','verify_phone') DEFAULT 'login',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `expiresAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_email` (`email`),
  KEY `idx_created_at` (`createdAt`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appName` varchar(255) NOT NULL,
  `groupName` varchar(255) NOT NULL,
  `module` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `httpMethod` varchar(10) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (176,'MasterApp','Default','Dashboard','Read','MasterApp:Dashboard:Read','Anyone with this permission can read dashboard',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(177,'MasterApp','Default','User','Create','MasterApp:User:Create','Anyone with this permission can create user',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(178,'MasterApp','Default','User','Read','MasterApp:User:Read','Anyone with this permission can read user',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(179,'MasterApp','Default','User','Update','MasterApp:User:Update','Anyone with this permission can update user',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(180,'MasterApp','Default','User','Delete','MasterApp:User:Delete','Anyone with this permission can delete user',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(181,'MasterApp','Default','User','Restore','MasterApp:User:Restore','Anyone with this permission can restore user',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(182,'MasterApp','Default','User','Action','MasterApp:User:Action','Anyone with this permission can change user status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(183,'MasterApp','Default','Role','Create','MasterApp:Role:Create','Anyone with this permission can create role',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(184,'MasterApp','Default','Role','Read','MasterApp:Role:Read','Anyone with this permission can read role',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(185,'MasterApp','Default','Role','Update','MasterApp:Role:Update','Anyone with this permission can update role',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(186,'MasterApp','Default','Role','Delete','MasterApp:Role:Delete','Anyone with this permission can delete role',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(187,'MasterApp','Default','Role','Restore','MasterApp:Role:Restore','Anyone with this permission can restore role',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(188,'MasterApp','Default','Role','Action','MasterApp:Role:Action','Anyone with this permission can change role status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(189,'MasterApp','Default','Organization','Create','MasterApp:Organization:Create','Anyone with this permission can create organization',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(190,'MasterApp','Default','Organization','Read','MasterApp:Organization:Read','Anyone with this permission can read organization',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(191,'MasterApp','Default','Organization','Update','MasterApp:Organization:Update','Anyone with this permission can update organization',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(192,'MasterApp','Default','Organization','Delete','MasterApp:Organization:Delete','Anyone with this permission can delete organization',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(193,'MasterApp','Default','Organization','Restore','MasterApp:Organization:Restore','Anyone with this permission can restore organization',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(194,'MasterApp','Default','Organization','Action','MasterApp:Organization:Action','Anyone with this permission can change organization status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(195,'MasterApp','Default','Center','Create','MasterApp:Center:Create','Anyone with this permission can create center',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(196,'MasterApp','Default','Center','Read','MasterApp:Center:Read','Anyone with this permission can read center',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(197,'MasterApp','Default','Center','Update','MasterApp:Center:Update','Anyone with this permission can update center',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(198,'MasterApp','Default','Center','Delete','MasterApp:Center:Delete','Anyone with this permission can delete center',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(199,'MasterApp','Default','Center','Restore','MasterApp:Center:Restore','Anyone with this permission can restore center',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(200,'MasterApp','Default','Center','Action','MasterApp:Center:Action','Anyone with this permission can change center status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(201,'MasterApp','Default','AppSetting','Create','MasterApp:AppSetting:Create','Anyone with this permission can create app setting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(202,'MasterApp','Default','AppSetting','Read','MasterApp:AppSetting:Read','Anyone with this permission can read app setting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(203,'MasterApp','Default','AppSetting','Update','MasterApp:AppSetting:Update','Anyone with this permission can update app setting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(204,'MasterApp','Default','AppSetting','Delete','MasterApp:AppSetting:Delete','Anyone with this permission can delete app setting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(205,'MasterApp','Default','Project','Create','MasterApp:Project:Create','Anyone with this permission can create project',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(206,'MasterApp','Default','Project','Read','MasterApp:Project:Read','Anyone with this permission can read project',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(207,'MasterApp','Default','Project','Update','MasterApp:Project:Update','Anyone with this permission can update project',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(208,'MasterApp','Default','Project','Delete','MasterApp:Project:Delete','Anyone with this permission can delete project',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(209,'MasterApp','Default','Project','Restore','MasterApp:Project:Restore','Anyone with this permission can restore project',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(210,'MasterApp','Default','Project','Action','MasterApp:Project:Action','Anyone with this permission can change project status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(211,'MasterApp','Default','Module','Create','MasterApp:Module:Create','Anyone with this permission can create module',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(212,'MasterApp','Default','Module','Read','MasterApp:Module:Read','Anyone with this permission can read module',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(213,'MasterApp','Default','Module','Update','MasterApp:Module:Update','Anyone with this permission can update module',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(214,'MasterApp','Default','Module','Delete','MasterApp:Module:Delete','Anyone with this permission can delete module',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(215,'MasterApp','Default','Module','Restore','MasterApp:Module:Restore','Anyone with this permission can restore module',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(216,'MasterApp','Default','Module','Action','MasterApp:Module:Action','Anyone with this permission can change module status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(217,'MasterApp','Default','Coupon','Create','MasterApp:Coupon:Create','Anyone with this permission can create coupon',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(218,'MasterApp','Default','Coupon','Read','MasterApp:Coupon:Read','Anyone with this permission can read coupon',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(219,'MasterApp','Default','Coupon','Update','MasterApp:Coupon:Update','Anyone with this permission can update coupon',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(220,'MasterApp','Default','Coupon','Delete','MasterApp:Coupon:Delete','Anyone with this permission can delete coupon',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(221,'MasterApp','Default','Coupon','Restore','MasterApp:Coupon:Restore','Anyone with this permission can restore coupon',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(222,'MasterApp','Default','Coupon','Action','MasterApp:Coupon:Action','Anyone with this permission can change coupon status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(223,'MasterApp','Default','Offer','Create','MasterApp:Offer:Create','Anyone with this permission can create offer',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(224,'MasterApp','Default','Offer','Read','MasterApp:Offer:Read','Anyone with this permission can read offer',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(225,'MasterApp','Default','Offer','Update','MasterApp:Offer:Update','Anyone with this permission can update offer',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(226,'MasterApp','Default','Offer','Delete','MasterApp:Offer:Delete','Anyone with this permission can delete offer',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(227,'MasterApp','Default','Offer','Restore','MasterApp:Offer:Restore','Anyone with this permission can restore offer',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(228,'MasterApp','Default','Offer','Action','MasterApp:Offer:Action','Anyone with this permission can change offer status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(229,'MasterApp','Default','Package','Create','MasterApp:Package:Create','Anyone with this permission can create package',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(230,'MasterApp','Default','Package','Read','MasterApp:Package:Read','Anyone with this permission can read package',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(231,'MasterApp','Default','Package','Update','MasterApp:Package:Update','Anyone with this permission can update package',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(232,'MasterApp','Default','Package','Delete','MasterApp:Package:Delete','Anyone with this permission can delete package',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(233,'MasterApp','Default','Package','Restore','MasterApp:Package:Restore','Anyone with this permission can restore package',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(234,'MasterApp','Default','Package','Action','MasterApp:Package:Action','Anyone with this permission can change package status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(235,'MasterApp','Default','Plan','Create','MasterApp:Plan:Create','Anyone with this permission can create plan',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(236,'MasterApp','Default','Plan','Read','MasterApp:Plan:Read','Anyone with this permission can read plan',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(237,'MasterApp','Default','Plan','Update','MasterApp:Plan:Update','Anyone with this permission can update plan',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(238,'MasterApp','Default','Plan','Delete','MasterApp:Plan:Delete','Anyone with this permission can delete plan',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(239,'MasterApp','Default','Plan','Restore','MasterApp:Plan:Restore','Anyone with this permission can restore plan',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(240,'MasterApp','Default','Plan','Action','MasterApp:Plan:Action','Anyone with this permission can change plan status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(241,'MasterApp','Default','Subscription','Create','MasterApp:Subscription:Create','Anyone with this permission can create subscription',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(242,'MasterApp','Default','Subscription','Read','MasterApp:Subscription:Read','Anyone with this permission can read subscription',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(243,'MasterApp','Default','Subscription','Update','MasterApp:Subscription:Update','Anyone with this permission can update subscription',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(244,'MasterApp','Default','Subscription','Delete','MasterApp:Subscription:Delete','Anyone with this permission can delete subscription',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(245,'MasterApp','Default','Subscription','Restore','MasterApp:Subscription:Restore','Anyone with this permission can restore subscription',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(246,'MasterApp','Default','Subscription','Action','MasterApp:Subscription:Action','Anyone with this permission can change subscription status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(247,'MasterApp','Default','License','Create','MasterApp:License:Create','Anyone with this permission can create license',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(248,'MasterApp','Default','License','Read','MasterApp:License:Read','Anyone with this permission can read license',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(249,'MasterApp','Default','License','Update','MasterApp:License:Update','Anyone with this permission can update license',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(250,'MasterApp','Default','License','Delete','MasterApp:License:Delete','Anyone with this permission can delete license',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(251,'MasterApp','Default','License','Restore','MasterApp:License:Restore','Anyone with this permission can restore license',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(252,'MasterApp','Default','License','Action','MasterApp:License:Action','Anyone with this permission can change license status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(253,'TaskHoper','Default','Meeting','Create','TaskHoper:Meeting:Create','Anyone with this permission can create meeting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(254,'TaskHoper','Default','Meeting','Read','TaskHoper:Meeting:Read','Anyone with this permission can read meeting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(255,'TaskHoper','Default','Meeting','Update','TaskHoper:Meeting:Update','Anyone with this permission can update meeting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(256,'TaskHoper','Default','Meeting','Delete','TaskHoper:Meeting:Delete','Anyone with this permission can delete meeting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(257,'TaskHoper','Default','Meeting','Restore','TaskHoper:Meeting:Restore','Anyone with this permission can restore meeting',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(258,'TaskHoper','Default','Meeting','Action','TaskHoper:Meeting:Action','Anyone with this permission can change meeting status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(259,'TaskHoper','Default','MeetingVenue','Create','TaskHoper:MeetingVenue:Create','Anyone with this permission can create meeting venue',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(260,'TaskHoper','Default','MeetingVenue','Read','TaskHoper:MeetingVenue:Read','Anyone with this permission can read meeting venue',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(261,'TaskHoper','Default','MeetingVenue','Update','TaskHoper:MeetingVenue:Update','Anyone with this permission can update meeting venue',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(262,'TaskHoper','Default','MeetingVenue','Delete','TaskHoper:MeetingVenue:Delete','Anyone with this permission can delete meeting venue',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(263,'TaskHoper','Default','MeetingVenue','Restore','TaskHoper:MeetingVenue:Restore','Anyone with this permission can restore meeting venue',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(264,'TaskHoper','Default','MeetingVenue','Action','TaskHoper:MeetingVenue:Action','Anyone with this permission can change meeting venue status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(265,'TaskHoper','Default','MeetingType','Create','TaskHoper:MeetingType:Create','Anyone with this permission can create meeting type',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(266,'TaskHoper','Default','MeetingType','Read','TaskHoper:MeetingType:Read','Anyone with this permission can read meeting type',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(267,'TaskHoper','Default','MeetingType','Update','TaskHoper:MeetingType:Update','Anyone with this permission can update meeting type',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(268,'TaskHoper','Default','MeetingType','Delete','TaskHoper:MeetingType:Delete','Anyone with this permission can delete meeting type',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(269,'TaskHoper','Default','MeetingType','Restore','TaskHoper:MeetingType:Restore','Anyone with this permission can restore meeting type',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(270,'TaskHoper','Default','MeetingType','Action','TaskHoper:MeetingType:Action','Anyone with this permission can change meeting type status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(271,'TaskHoper','Default','MeetingTask','Create','TaskHoper:MeetingTask:Create','Anyone with this permission can create meeting task',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(272,'TaskHoper','Default','MeetingTask','Read','TaskHoper:MeetingTask:Read','Anyone with this permission can read meeting task',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(273,'TaskHoper','Default','MeetingTask','Update','TaskHoper:MeetingTask:Update','Anyone with this permission can update meeting task',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(274,'TaskHoper','Default','MeetingTask','Delete','TaskHoper:MeetingTask:Delete','Anyone with this permission can delete meeting task',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(275,'TaskHoper','Default','MeetingTask','Restore','TaskHoper:MeetingTask:Restore','Anyone with this permission can restore meeting task',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(276,'TaskHoper','Default','MeetingTask','Action','TaskHoper:MeetingTask:Action','Anyone with this permission can change meeting task status',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(277,'TaskHoper','Default','MeetingNote','Create','TaskHoper:MeetingNote:Create','Anyone with this permission can create meeting note',NULL,NULL,'2026-02-26 12:31:26','2026-02-26 12:31:26',NULL),(278,'TaskHoper','Default','MeetingNote','Read','TaskHoper:MeetingNote:Read','Anyone with this permission can read meeting note',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(279,'TaskHoper','Default','MeetingNote','Update','TaskHoper:MeetingNote:Update','Anyone with this permission can update meeting note',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(280,'TaskHoper','Default','MeetingNote','Delete','TaskHoper:MeetingNote:Delete','Anyone with this permission can delete meeting note',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(281,'TaskHoper','Default','MeetingNote','Restore','TaskHoper:MeetingNote:Restore','Anyone with this permission can restore meeting note',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(282,'TaskHoper','Default','MeetingNote','Action','TaskHoper:MeetingNote:Action','Anyone with this permission can change meeting note status',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(283,'TaskHoper','Default','MeetingNotePad','Create','TaskHoper:MeetingNotePad:Create','Anyone with this permission can create meeting note pad',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(284,'TaskHoper','Default','MeetingNotePad','Read','TaskHoper:MeetingNotePad:Read','Anyone with this permission can read meeting note pad',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(285,'TaskHoper','Default','MeetingNotePad','Update','TaskHoper:MeetingNotePad:Update','Anyone with this permission can update meeting note pad',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(286,'TaskHoper','Default','MeetingNotePad','Delete','TaskHoper:MeetingNotePad:Delete','Anyone with this permission can delete meeting note pad',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(287,'TaskHoper','Default','MeetingNotePad','Restore','TaskHoper:MeetingNotePad:Restore','Anyone with this permission can restore meeting note pad',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(288,'TaskHoper','Default','MeetingNotePad','Action','TaskHoper:MeetingNotePad:Action','Anyone with this permission can change meeting note pad status',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(289,'TaskHoper','Default','MeetingFollowUp','Create','TaskHoper:MeetingFollowUp:Create','Anyone with this permission can create meeting follow up',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(290,'TaskHoper','Default','MeetingFollowUp','Read','TaskHoper:MeetingFollowUp:Read','Anyone with this permission can red meeting follow up',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(291,'TaskHoper','Default','MeetingFollowUp','Update','TaskHoper:MeetingFollowUp:Update','Anyone with this permission can update meeting follow up',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(292,'TaskHoper','Default','MeetingFollowUp','Delete','TaskHoper:MeetingFollowUp:Delete','Anyone with this permission can delete meeting follow up',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(293,'TaskHoper','Default','MeetingFollowUp','Restore','TaskHoper:MeetingFollowUp:Restore','Anyone with this permission can restore meeting follow up',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(294,'TaskHoper','Default','MeetingFollowUp','Action','TaskHoper:MeetingFollowUp:Action','Anyone with this permission can action meeting follow up',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(295,'VehicleApp','Default','Vehicle','Create','VehicleApp:Vehicle:Create','Anyone with this permission can create a vehicle',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(296,'VehicleApp','Default','Vehicle','Read','VehicleApp:Vehicle:Read','Anyone with this permission can read vehicle details',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(297,'VehicleApp','Default','Vehicle','Update','VehicleApp:Vehicle:Update','Anyone with this permission can update vehicle details',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(298,'VehicleApp','Default','Vehicle','Delete','VehicleApp:Vehicle:Delete','Anyone with this permission can delete a vehicle',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(299,'VehicleApp','Default','Vehicle','Restore','VehicleApp:Vehicle:Restore','Anyone with this permission can restore Vehicle note',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(300,'VehicleApp','Default','Vehicle','Action','VehicleApp:Vehicle:Action','Anyone with this permission can change Vehicle note status',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(301,'VehicleApp','Default','VehicleBreakdown','Create','VehicleApp:VehicleBreakdown:Create','Anyone with this permission can create a vehicle breakdown record',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(302,'VehicleApp','Default','VehicleBreakdown','Read','VehicleApp:VehicleBreakdown:Read','Anyone with this permission can read vehicle breakdown details',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(303,'VehicleApp','Default','VehicleBreakdown','Update','VehicleApp:VehicleBreakdown:Update','Anyone with this permission can update vehicle breakdown details',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(304,'VehicleApp','Default','VehicleBreakdown','Delete','VehicleApp:VehicleBreakdown:Delete','Anyone with this permission can delete a vehicle breakdown record',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(305,'VehicleApp','Default','VehicleBreakdown','Restore','VehicleApp:VehicleBreakdown:Restore','Anyone with this permission can restore vehicle breakdown record',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(306,'VehicleApp','Default','VehicleBreakdown','Action','VehicleApp:VehicleBreakdown:Action','Anyone with this permission can change vehicle breakdown status',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(307,'VehicleApp','Default','VehicleExpense','Create','VehicleApp:VehicleExpense:Create','Anyone with this permission can create a vehicle expense record',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(308,'VehicleApp','Default','VehicleExpense','Read','VehicleApp:VehicleExpense:Read','Anyone with this permission can read vehicle expense details',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(309,'VehicleApp','Default','VehicleExpense','Update','VehicleApp:VehicleExpense:Update','Anyone with this permission can update vehicle expense details',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(310,'VehicleApp','Default','VehicleExpense','Delete','VehicleApp:VehicleExpense:Delete','Anyone with this permission can delete a vehicle expense record',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(311,'VehicleApp','Default','VehicleExpense','Restore','VehicleApp:VehicleExpense:Restore','Anyone with this permission can restore vehicle expense record',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(312,'VehicleApp','Default','VehicleExpense','Action','VehicleApp:VehicleExpense:Action','Anyone with this permission can change vehicle expense status',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(313,'MaterialApp','Default','Warehouse','Create','MaterialApp:Warehouse:Create','Anyone with this permission can create warehouse',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(314,'MaterialApp','Default','Warehouse','Read','MaterialApp:Warehouse:Read','Anyone with this permission can read warehouse',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(315,'MaterialApp','Default','Warehouse','Update','MaterialApp:Warehouse:Update','Anyone with this permission can update warehouse',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(316,'MaterialApp','Default','Warehouse','Delete','MaterialApp:Warehouse:Delete','Anyone with this permission can delete warehouse',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(317,'MaterialApp','Default','Warehouse','Restore','MaterialApp:Warehouse:Restore','Anyone with this permission can restore warehouse',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(318,'MaterialApp','Default','Warehouse','Action','MaterialApp:Warehouse:Action','Anyone with this permission can perform warehouse actions',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(319,'MaterialApp','Default','Unit','Create','MaterialApp:Unit:Create','Anyone with this permission can create unit',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(320,'MaterialApp','Default','Unit','Read','MaterialApp:Unit:Read','Anyone with this permission can read unit',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(321,'MaterialApp','Default','Unit','Update','MaterialApp:Unit:Update','Anyone with this permission can update unit',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(322,'MaterialApp','Default','Unit','Delete','MaterialApp:Unit:Delete','Anyone with this permission can delete unit',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(323,'MaterialApp','Default','Unit','Restore','MaterialApp:Unit:Restore','Anyone with this permission can restore unit',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(324,'MaterialApp','Default','Unit','Action','MaterialApp:Unit:Action','Anyone with this permission can perform unit actions',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(325,'MaterialApp','Default','Category','Create','MaterialApp:Category:Create','Anyone with this permission can create category',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(326,'MaterialApp','Default','Category','Read','MaterialApp:Category:Read','Anyone with this permission can read category',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(327,'MaterialApp','Default','Category','Update','MaterialApp:Category:Update','Anyone with this permission can update category',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(328,'MaterialApp','Default','Category','Delete','MaterialApp:Category:Delete','Anyone with this permission can delete category',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(329,'MaterialApp','Default','Category','Restore','MaterialApp:Category:Restore','Anyone with this permission can restore category',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(330,'MaterialApp','Default','Category','Action','MaterialApp:Category:Action','Anyone with this permission can perform category actions',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(331,'MaterialApp','Default','AppSetting','Read','MaterialApp:AppSetting:Read','Anyone with this permission can read app setting',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(332,'MaterialApp','Default','AppSetting','Update','MaterialApp:AppSetting:Update','Anyone with this permission can update app setting',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(333,'MaterialApp','Default','Supplier','Create','MaterialApp:Supplier:Create','Anyone with this permission can create supplier',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(334,'MaterialApp','Default','Supplier','Read','MaterialApp:Supplier:Read','Anyone with this permission can read supplier',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(335,'MaterialApp','Default','Supplier','Update','MaterialApp:Supplier:Update','Anyone with this permission can update supplier',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(336,'MaterialApp','Default','Supplier','Delete','MaterialApp:Supplier:Delete','Anyone with this permission can delete supplier',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(337,'MaterialApp','Default','Supplier','Restore','MaterialApp:Supplier:Restore','Anyone with this permission can restore supplier',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(338,'MaterialApp','Default','Supplier','Action','MaterialApp:Supplier:Action','Anyone with this permission can perform supplier actions',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(339,'MaterialApp','Default','Material','Create','MaterialApp:Material:Create','Anyone with this permission can create material',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(340,'MaterialApp','Default','Material','Read','MaterialApp:Material:Read','Anyone with this permission can read material',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(341,'MaterialApp','Default','Material','Update','MaterialApp:Material:Update','Anyone with this permission can update material',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(342,'MaterialApp','Default','Material','Delete','MaterialApp:Material:Delete','Anyone with this permission can delete material',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(343,'MaterialApp','Default','Material','Restore','MaterialApp:Material:Restore','Anyone with this permission can restore material',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(344,'MaterialApp','Default','Material','Action','MaterialApp:Material:Action','Anyone with this permission can perform material actions',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(345,'MaterialApp','Default','Inventory','Create','MaterialApp:Inventory:Create','Anyone with this permission can create inventory',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(346,'MaterialApp','Default','Inventory','Read','MaterialApp:Inventory:Read','Anyone with this permission can read inventory',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(347,'MaterialApp','Default','Inventory','Update','MaterialApp:Inventory:Update','Anyone with this permission can update inventory',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(348,'MaterialApp','Default','Inventory','Delete','MaterialApp:Inventory:Delete','Anyone with this permission can delete inventory',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(349,'MaterialApp','Default','Inventory','Restore','MaterialApp:Inventory:Restore','Anyone with this permission can restore inventory',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(350,'MaterialApp','Default','Inventory','Action','MaterialApp:Inventory:Action','Anyone with this permission can perform inventory actions',NULL,NULL,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `programs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `durationType` varchar(50) DEFAULT NULL,
  `departmentId` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_department` (`departmentId`),
  KEY `idx_status` (`status`),
  CONSTRAINT `programs_ibfk_1` FOREIGN KEY (`departmentId`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('active','inactive','blocked','pending') DEFAULT 'active',
  `organizationId` int(11) NOT NULL,
  `createdById` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_projects_organization` (`organizationId`),
  KEY `idx_projects_createdBy` (`createdById`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`createdById`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result_subjects`
--

DROP TABLE IF EXISTS `result_subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result_subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `resultId` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL,
  `maxMarks` decimal(5,2) NOT NULL,
  `obtainedMarks` decimal(5,2) NOT NULL,
  `grade` varchar(20) NOT NULL,
  `isPassed` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_result` (`resultId`),
  KEY `idx_subject` (`subjectId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result_subjects`
--

LOCK TABLES `result_subjects` WRITE;
/*!40000 ALTER TABLE `result_subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `result_subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `results`
--

DROP TABLE IF EXISTS `results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `examName` varchar(100) NOT NULL,
  `semester` varchar(50) NOT NULL,
  `academicYear` varchar(50) NOT NULL,
  `examDate` date NOT NULL,
  `totalMarks` decimal(5,2) NOT NULL,
  `obtainedMarks` decimal(5,2) NOT NULL,
  `percentage` decimal(5,2) NOT NULL,
  `grade` varchar(20) NOT NULL,
  `resultType` enum('internal','external','final') DEFAULT 'final',
  `status` enum('draft','published','unpublished') DEFAULT 'draft',
  `isPublished` tinyint(1) DEFAULT 0,
  `publishedAt` timestamp NULL DEFAULT NULL,
  `publishedBy` int(11) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `organizationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_student` (`studentId`),
  KEY `idx_course` (`courseId`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `results`
--

LOCK TABLES `results` WRITE;
/*!40000 ALTER TABLE `results` DISABLE KEYS */;
/*!40000 ALTER TABLE `results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `role_permissions_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permissions_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1051 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (526,4,176,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(527,4,177,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(528,4,178,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(529,4,179,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(530,4,180,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(531,4,181,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(532,4,182,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(533,4,183,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(534,4,184,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(535,4,185,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(536,4,186,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(537,4,187,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(538,4,188,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(539,4,189,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(540,4,190,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(541,4,191,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(542,4,192,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(543,4,193,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(544,4,194,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(545,4,195,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(546,4,196,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(547,4,197,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(548,4,198,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(549,4,199,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(550,4,200,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(551,4,201,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(552,4,202,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(553,4,203,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(554,4,204,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(555,4,205,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(556,4,206,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(557,4,207,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(558,4,208,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(559,4,209,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(560,4,210,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(561,4,211,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(562,4,212,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(563,4,213,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(564,4,214,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(565,4,215,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(566,4,216,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(567,4,217,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(568,4,218,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(569,4,219,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(570,4,220,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(571,4,221,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(572,4,222,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(573,4,223,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(574,4,224,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(575,4,225,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(576,4,226,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(577,4,227,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(578,4,228,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(579,4,229,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(580,4,230,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(581,4,231,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(582,4,232,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(583,4,233,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(584,4,234,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(585,4,235,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(586,4,236,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(587,4,237,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(588,4,238,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(589,4,239,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(590,4,240,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(591,4,241,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(592,4,242,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(593,4,243,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(594,4,244,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(595,4,245,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(596,4,246,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(597,4,247,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(598,4,248,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(599,4,249,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(600,4,250,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(601,4,251,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(602,4,252,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(603,4,253,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(604,4,254,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(605,4,255,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(606,4,256,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(607,4,257,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(608,4,258,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(609,4,259,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(610,4,260,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(611,4,261,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(612,4,262,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(613,4,263,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(614,4,264,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(615,4,265,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(616,4,266,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(617,4,267,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(618,4,268,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(619,4,269,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(620,4,270,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(621,4,271,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(622,4,272,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(623,4,273,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(624,4,274,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(625,4,275,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(626,4,276,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(627,4,277,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(628,4,278,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(629,4,279,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(630,4,280,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(631,4,281,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(632,4,282,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(633,4,283,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(634,4,284,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(635,4,285,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(636,4,286,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(637,4,287,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(638,4,288,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(639,4,289,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(640,4,290,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(641,4,291,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(642,4,292,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(643,4,293,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(644,4,294,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(645,4,295,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(646,4,296,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(647,4,297,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(648,4,298,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(649,4,299,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(650,4,300,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(651,4,301,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(652,4,302,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(653,4,303,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(654,4,304,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(655,4,305,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(656,4,306,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(657,4,307,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(658,4,308,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(659,4,309,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(660,4,310,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(661,4,311,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(662,4,312,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(663,4,313,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(664,4,314,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(665,4,315,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(666,4,316,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(667,4,317,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(668,4,318,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(669,4,319,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(670,4,320,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(671,4,321,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(672,4,322,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(673,4,323,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(674,4,324,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(675,4,325,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(676,4,326,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(677,4,327,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(678,4,328,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(679,4,329,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(680,4,330,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(681,4,331,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(682,4,332,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(683,4,333,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(684,4,334,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(685,4,335,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(686,4,336,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(687,4,337,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(688,4,338,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(689,4,339,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(690,4,340,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(691,4,341,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(692,4,342,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(693,4,343,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(694,4,344,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(695,4,345,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(696,4,346,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(697,4,347,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(698,4,348,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(699,4,349,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(700,4,350,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(701,5,176,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(702,5,177,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(703,5,178,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(704,5,179,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(705,5,180,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(706,5,181,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(707,5,182,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(708,5,183,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(709,5,184,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(710,5,185,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(711,5,186,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(712,5,187,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(713,5,188,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(714,5,189,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(715,5,190,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(716,5,191,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(717,5,192,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(718,5,193,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(719,5,194,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(720,5,195,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(721,5,196,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(722,5,197,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(723,5,198,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(724,5,199,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(725,5,200,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(726,5,201,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(727,5,202,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(728,5,203,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(729,5,204,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(730,5,205,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(731,5,206,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(732,5,207,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(733,5,208,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(734,5,209,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(735,5,210,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(736,5,211,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(737,5,212,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(738,5,213,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(739,5,214,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(740,5,215,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(741,5,216,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(742,5,217,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(743,5,218,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(744,5,219,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(745,5,220,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(746,5,221,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(747,5,222,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(748,5,223,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(749,5,224,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(750,5,225,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(751,5,226,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(752,5,227,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(753,5,228,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(754,5,229,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(755,5,230,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(756,5,231,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(757,5,232,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(758,5,233,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(759,5,234,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(760,5,235,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(761,5,236,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(762,5,237,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(763,5,238,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(764,5,239,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(765,5,240,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(766,5,241,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(767,5,242,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(768,5,243,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(769,5,244,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(770,5,245,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(771,5,246,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(772,5,247,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(773,5,248,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(774,5,249,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(775,5,250,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(776,5,251,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(777,5,252,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(778,5,253,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(779,5,254,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(780,5,255,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(781,5,256,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(782,5,257,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(783,5,258,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(784,5,259,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(785,5,260,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(786,5,261,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(787,5,262,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(788,5,263,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(789,5,264,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(790,5,265,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(791,5,266,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(792,5,267,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(793,5,268,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(794,5,269,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(795,5,270,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(796,5,271,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(797,5,272,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(798,5,273,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(799,5,274,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(800,5,275,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(801,5,276,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(802,5,277,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(803,5,278,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(804,5,279,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(805,5,280,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(806,5,281,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(807,5,282,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(808,5,283,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(809,5,284,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(810,5,285,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(811,5,286,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(812,5,287,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(813,5,288,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(814,5,289,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(815,5,290,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(816,5,291,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(817,5,292,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(818,5,293,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(819,5,294,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(820,5,295,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(821,5,296,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(822,5,297,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(823,5,298,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(824,5,299,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(825,5,300,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(826,5,301,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(827,5,302,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(828,5,303,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(829,5,304,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(830,5,305,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(831,5,306,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(832,5,307,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(833,5,308,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(834,5,309,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(835,5,310,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(836,5,311,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(837,5,312,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(838,5,313,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(839,5,314,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(840,5,315,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(841,5,316,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(842,5,317,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(843,5,318,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(844,5,319,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(845,5,320,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(846,5,321,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(847,5,322,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(848,5,323,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(849,5,324,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(850,5,325,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(851,5,326,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(852,5,327,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(853,5,328,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(854,5,329,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(855,5,330,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(856,5,331,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(857,5,332,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(858,5,333,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(859,5,334,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(860,5,335,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(861,5,336,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(862,5,337,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(863,5,338,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(864,5,339,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(865,5,340,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(866,5,341,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(867,5,342,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(868,5,343,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(869,5,344,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(870,5,345,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(871,5,346,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(872,5,347,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(873,5,348,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(874,5,349,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(875,5,350,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(876,6,176,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(877,6,177,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(878,6,178,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(879,6,179,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(880,6,180,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(881,6,181,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(882,6,182,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(883,6,183,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(884,6,184,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(885,6,185,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(886,6,186,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(887,6,187,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(888,6,188,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(889,6,189,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(890,6,190,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(891,6,191,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(892,6,192,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(893,6,193,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(894,6,194,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(895,6,195,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(896,6,196,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(897,6,197,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(898,6,198,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(899,6,199,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(900,6,200,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(901,6,201,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(902,6,202,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(903,6,203,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(904,6,204,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(905,6,205,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(906,6,206,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(907,6,207,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(908,6,208,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(909,6,209,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(910,6,210,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(911,6,211,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(912,6,212,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(913,6,213,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(914,6,214,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(915,6,215,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(916,6,216,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(917,6,217,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(918,6,218,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(919,6,219,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(920,6,220,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(921,6,221,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(922,6,222,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(923,6,223,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(924,6,224,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(925,6,225,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(926,6,226,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(927,6,227,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(928,6,228,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(929,6,229,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(930,6,230,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(931,6,231,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(932,6,232,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(933,6,233,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(934,6,234,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(935,6,235,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(936,6,236,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(937,6,237,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(938,6,238,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(939,6,239,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(940,6,240,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(941,6,241,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(942,6,242,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(943,6,243,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(944,6,244,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(945,6,245,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(946,6,246,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(947,6,247,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(948,6,248,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(949,6,249,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(950,6,250,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(951,6,251,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(952,6,252,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(953,6,253,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(954,6,254,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(955,6,255,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(956,6,256,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(957,6,257,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(958,6,258,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(959,6,259,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(960,6,260,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(961,6,261,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(962,6,262,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(963,6,263,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(964,6,264,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(965,6,265,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(966,6,266,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(967,6,267,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(968,6,268,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(969,6,269,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(970,6,270,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(971,6,271,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(972,6,272,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(973,6,273,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(974,6,274,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(975,6,275,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(976,6,276,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(977,6,277,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(978,6,278,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(979,6,279,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(980,6,280,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(981,6,281,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(982,6,282,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(983,6,283,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(984,6,284,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(985,6,285,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(986,6,286,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(987,6,287,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(988,6,288,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(989,6,289,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(990,6,290,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(991,6,291,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(992,6,292,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(993,6,293,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(994,6,294,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(995,6,295,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(996,6,296,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(997,6,297,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(998,6,298,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(999,6,299,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1000,6,300,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1001,6,301,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1002,6,302,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1003,6,303,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1004,6,304,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1005,6,305,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1006,6,306,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1007,6,307,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1008,6,308,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1009,6,309,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1010,6,310,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1011,6,311,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1012,6,312,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1013,6,313,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1014,6,314,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1015,6,315,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1016,6,316,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1017,6,317,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1018,6,318,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1019,6,319,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1020,6,320,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1021,6,321,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1022,6,322,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1023,6,323,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1024,6,324,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1025,6,325,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1026,6,326,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1027,6,327,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1028,6,328,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1029,6,329,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1030,6,330,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1031,6,331,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1032,6,332,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1033,6,333,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1034,6,334,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1035,6,335,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1036,6,336,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1037,6,337,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1038,6,338,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1039,6,339,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1040,6,340,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1041,6,341,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1042,6,342,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1043,6,343,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1044,6,344,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1045,6,345,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1046,6,346,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1047,6,347,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1048,6,348,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1049,6,349,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(1050,6,350,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL);
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `organizationId` int(11) NOT NULL,
  `roleType` varchar(255) DEFAULT NULL,
  `isPrimary` tinyint(1) DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `organizationId` (`organizationId`),
  CONSTRAINT `roles_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (4,'Admin','Admin Role',2,'admin',1,'active','2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(5,'primary_organization_admin_role','Organization Admin Role',2,'organization-admin',1,'active','2026-02-26 12:31:27','2026-02-26 12:31:27',NULL),(6,'primary_organization_employee_role','Organization Employee Role',2,'organization-employee',1,'active','2026-02-26 12:31:27','2026-02-26 12:31:27',NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specializations`
--

DROP TABLE IF EXISTS `specializations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specializations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `streamId` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_stream` (`streamId`),
  KEY `idx_status` (`status`),
  CONSTRAINT `specializations_ibfk_1` FOREIGN KEY (`streamId`) REFERENCES `streams` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specializations`
--

LOCK TABLES `specializations` WRITE;
/*!40000 ALTER TABLE `specializations` DISABLE KEYS */;
/*!40000 ALTER TABLE `specializations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `streams`
--

DROP TABLE IF EXISTS `streams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `streams` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `programId` int(11) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_program` (`programId`),
  KEY `idx_status` (`status`),
  CONSTRAINT `streams_ibfk_1` FOREIGN KEY (`programId`) REFERENCES `programs` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `streams`
--

LOCK TABLES `streams` WRITE;
/*!40000 ALTER TABLE `streams` DISABLE KEYS */;
/*!40000 ALTER TABLE `streams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isMe` tinyint(1) NOT NULL DEFAULT 0,
  `organizationId` int(11) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'active',
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `qualification` varchar(255) DEFAULT NULL,
  `percentage` double DEFAULT NULL,
  `documentUrl` varchar(1024) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `mobileNumber` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(50) DEFAULT NULL,
  `enrollmentNumber` varchar(255) DEFAULT NULL,
  `courseName` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `admissionDate` date DEFAULT NULL,
  `sessionYear` varchar(50) DEFAULT NULL,
  `profilePhoto` varchar(1024) DEFAULT NULL,
  `aadhaarNumber` varchar(255) DEFAULT NULL,
  `previousMarksheet` varchar(1024) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `centerId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_student_organization` (`organizationId`),
  KEY `FK_b35463776b4a11a3df3c30d920a` (`userId`),
  KEY `FK_b16fea2d7d6c69249bb69f02868` (`centerId`),
  CONSTRAINT `FK_b16fea2d7d6c69249bb69f02868` FOREIGN KEY (`centerId`) REFERENCES `centers` (`id`) ON DELETE SET NULL,
  CONSTRAINT `FK_b35463776b4a11a3df3c30d920a` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_fees`
--

DROP TABLE IF EXISTS `student_fees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_fees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) NOT NULL,
  `feeStructureId` int(11) NOT NULL,
  `totalAmount` decimal(10,2) NOT NULL,
  `paidAmount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `pendingAmount` decimal(10,2) NOT NULL,
  `discountAmount` decimal(10,2) DEFAULT 0.00,
  `discountReason` text DEFAULT NULL,
  `lateFeeAmount` decimal(10,2) DEFAULT 0.00,
  `status` enum('pending','partial','paid','overdue') DEFAULT 'pending',
  `dueDate` date DEFAULT NULL,
  `centerId` int(11) DEFAULT NULL,
  `organizationId` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_student` (`studentId`),
  KEY `idx_fee_structure` (`feeStructureId`),
  KEY `idx_status` (`status`),
  KEY `idx_center` (`centerId`),
  KEY `idx_due_date` (`dueDate`),
  CONSTRAINT `fk_student_fees_structure` FOREIGN KEY (`feeStructureId`) REFERENCES `fee_structures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_student_fees_student` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_fees`
--

LOCK TABLES `student_fees` WRITE;
/*!40000 ALTER TABLE `student_fees` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_fees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subjects`
--

DROP TABLE IF EXISTS `subjects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subjects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `type` enum('theory','practical','both') DEFAULT 'theory',
  `credits` int(11) DEFAULT NULL,
  `maxMarks` int(11) DEFAULT NULL,
  `minMarks` int(11) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `idx_status` (`status`),
  KEY `idx_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subjects`
--

LOCK TABLES `subjects` WRITE;
/*!40000 ALTER TABLE `subjects` DISABLE KEYS */;
/*!40000 ALTER TABLE `subjects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1,4,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobileNo` bigint(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending' COMMENT 'active, inactive, blocked, pending',
  `userType` varchar(255) NOT NULL DEFAULT 'organizationEmployee' COMMENT 'admin, adminEmployee, organization, organizationEmployee',
  `designation` varchar(255) DEFAULT NULL COMMENT 'SUPER_ADMIN, CEO, CTO, HR, MANAGER, TEAM_LEAD, EMPLOYEE',
  `avatar` varchar(255) DEFAULT 'avatar',
  `parentId` int(11) DEFAULT NULL,
  `organizationId` int(11) NOT NULL,
  `isPrimary` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `address` text DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `pincode` varchar(255) DEFAULT NULL,
  `enrollmentNumber` varchar(255) DEFAULT NULL,
  `courseName` varchar(255) DEFAULT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `admissionDate` date DEFAULT NULL,
  `sessionYear` varchar(255) DEFAULT NULL,
  `profilePhoto` varchar(255) DEFAULT NULL,
  `aadhaarNumber` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `percentage` float DEFAULT NULL,
  `documentUrl` varchar(255) DEFAULT NULL,
  `previousMarksheet` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_user_email` (`username`,`email`),
  KEY `idx_org_id` (`organizationId`),
  KEY `idx_parent_id` (`parentId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin','admin@newrise.in',9876543210,'$argon2id$v=19$m=65536,t=3,p=4$o13Q/q3lcqTx1BJfFc6P2w$qUAaAXCmoOA2L2k8qGCzn1izhYMwKrZYtFPy79iFV4Q','active','admin','CEO','avatar',NULL,2,1,'2026-02-26 12:31:27','2026-02-26 12:31:27',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-26 18:02:04
