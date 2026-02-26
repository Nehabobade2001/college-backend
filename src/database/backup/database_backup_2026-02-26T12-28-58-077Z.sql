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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_settings`
--

LOCK TABLES `app_settings` WRITE;
/*!40000 ALTER TABLE `app_settings` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1730561320000,'Organizations1730561320000'),(2,1730561332780,'Permissions1730561332780'),(3,1730561340421,'Roles1730561340421'),(4,1730561346366,'Users1730561346366'),(5,1740242603000,'CreateOtpTable1740242603000'),(6,1740243000000,'MasterManagementTables1740243000000'),(7,1740245000000,'CreateCourseTables1740245000000'),(8,1740246000000,'CreateResultTables1740246000000'),(9,1740475800000,'AddRouteToPermissions1740475800000'),(10,1740556114000,'CreateEventsTable1740556114000'),(11,1740557000000,'MakeStreamIdNullableInSpecializations1740557000000'),(12,1740558000000,'CreateComplaintsTable1740558000000'),(13,1740648913214,'ApiToken1740648913214'),(14,1740730153709,'RolePermissions1740730153709'),(15,1740730199871,'UserRoles1740730199871'),(16,1741245865726,'AppSetting1741245865726'),(17,1742889299643,'Modules1742889299643'),(18,1743000000000,'Centers1743000000000'),(19,1744000000000,'Students1744000000000'),(20,1745000000000,'AddStudentFields1745000000000'),(21,1746000000000,'AddFranchiseFieldsToCenters1746000000000'),(22,1747000000000,'AddAddressToCenters1747000000000'),(23,1748000000000,'AddPhoneToCenters1748000000000'),(24,1750000000000,'CreateFeesTables1750000000000'),(25,1751000000000,'CreateFeeSubmissionsTable1751000000000'),(26,1752000000000,'CreateProjects1752000000000'),(27,1754000000000,'AddUserIdToStudent1754000000000'),(28,1755000000000,'AddCenterIdToStudent1755000000000');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES (1,'Test Organization','Test Organization Description','pending','2026-02-26 12:28:21','2026-02-26 12:28:21',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=176 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'MasterApp','Default','Dashboard','Read','MasterApp:Dashboard:Read','Anyone with this permission can read dashboard',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(2,'MasterApp','Default','User','Create','MasterApp:User:Create','Anyone with this permission can create user',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(3,'MasterApp','Default','User','Read','MasterApp:User:Read','Anyone with this permission can read user',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(4,'MasterApp','Default','User','Update','MasterApp:User:Update','Anyone with this permission can update user',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(5,'MasterApp','Default','User','Delete','MasterApp:User:Delete','Anyone with this permission can delete user',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(6,'MasterApp','Default','User','Restore','MasterApp:User:Restore','Anyone with this permission can restore user',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(7,'MasterApp','Default','User','Action','MasterApp:User:Action','Anyone with this permission can change user status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(8,'MasterApp','Default','Role','Create','MasterApp:Role:Create','Anyone with this permission can create role',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(9,'MasterApp','Default','Role','Read','MasterApp:Role:Read','Anyone with this permission can read role',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(10,'MasterApp','Default','Role','Update','MasterApp:Role:Update','Anyone with this permission can update role',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(11,'MasterApp','Default','Role','Delete','MasterApp:Role:Delete','Anyone with this permission can delete role',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(12,'MasterApp','Default','Role','Restore','MasterApp:Role:Restore','Anyone with this permission can restore role',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(13,'MasterApp','Default','Role','Action','MasterApp:Role:Action','Anyone with this permission can change role status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(14,'MasterApp','Default','Organization','Create','MasterApp:Organization:Create','Anyone with this permission can create organization',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(15,'MasterApp','Default','Organization','Read','MasterApp:Organization:Read','Anyone with this permission can read organization',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(16,'MasterApp','Default','Organization','Update','MasterApp:Organization:Update','Anyone with this permission can update organization',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(17,'MasterApp','Default','Organization','Delete','MasterApp:Organization:Delete','Anyone with this permission can delete organization',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(18,'MasterApp','Default','Organization','Restore','MasterApp:Organization:Restore','Anyone with this permission can restore organization',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(19,'MasterApp','Default','Organization','Action','MasterApp:Organization:Action','Anyone with this permission can change organization status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(20,'MasterApp','Default','Center','Create','MasterApp:Center:Create','Anyone with this permission can create center',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(21,'MasterApp','Default','Center','Read','MasterApp:Center:Read','Anyone with this permission can read center',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(22,'MasterApp','Default','Center','Update','MasterApp:Center:Update','Anyone with this permission can update center',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(23,'MasterApp','Default','Center','Delete','MasterApp:Center:Delete','Anyone with this permission can delete center',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(24,'MasterApp','Default','Center','Restore','MasterApp:Center:Restore','Anyone with this permission can restore center',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(25,'MasterApp','Default','Center','Action','MasterApp:Center:Action','Anyone with this permission can change center status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(26,'MasterApp','Default','AppSetting','Create','MasterApp:AppSetting:Create','Anyone with this permission can create app setting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(27,'MasterApp','Default','AppSetting','Read','MasterApp:AppSetting:Read','Anyone with this permission can read app setting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(28,'MasterApp','Default','AppSetting','Update','MasterApp:AppSetting:Update','Anyone with this permission can update app setting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(29,'MasterApp','Default','AppSetting','Delete','MasterApp:AppSetting:Delete','Anyone with this permission can delete app setting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(30,'MasterApp','Default','Project','Create','MasterApp:Project:Create','Anyone with this permission can create project',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(31,'MasterApp','Default','Project','Read','MasterApp:Project:Read','Anyone with this permission can read project',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(32,'MasterApp','Default','Project','Update','MasterApp:Project:Update','Anyone with this permission can update project',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(33,'MasterApp','Default','Project','Delete','MasterApp:Project:Delete','Anyone with this permission can delete project',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(34,'MasterApp','Default','Project','Restore','MasterApp:Project:Restore','Anyone with this permission can restore project',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(35,'MasterApp','Default','Project','Action','MasterApp:Project:Action','Anyone with this permission can change project status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(36,'MasterApp','Default','Module','Create','MasterApp:Module:Create','Anyone with this permission can create module',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(37,'MasterApp','Default','Module','Read','MasterApp:Module:Read','Anyone with this permission can read module',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(38,'MasterApp','Default','Module','Update','MasterApp:Module:Update','Anyone with this permission can update module',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(39,'MasterApp','Default','Module','Delete','MasterApp:Module:Delete','Anyone with this permission can delete module',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(40,'MasterApp','Default','Module','Restore','MasterApp:Module:Restore','Anyone with this permission can restore module',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(41,'MasterApp','Default','Module','Action','MasterApp:Module:Action','Anyone with this permission can change module status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(42,'MasterApp','Default','Coupon','Create','MasterApp:Coupon:Create','Anyone with this permission can create coupon',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(43,'MasterApp','Default','Coupon','Read','MasterApp:Coupon:Read','Anyone with this permission can read coupon',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(44,'MasterApp','Default','Coupon','Update','MasterApp:Coupon:Update','Anyone with this permission can update coupon',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(45,'MasterApp','Default','Coupon','Delete','MasterApp:Coupon:Delete','Anyone with this permission can delete coupon',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(46,'MasterApp','Default','Coupon','Restore','MasterApp:Coupon:Restore','Anyone with this permission can restore coupon',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(47,'MasterApp','Default','Coupon','Action','MasterApp:Coupon:Action','Anyone with this permission can change coupon status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(48,'MasterApp','Default','Offer','Create','MasterApp:Offer:Create','Anyone with this permission can create offer',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(49,'MasterApp','Default','Offer','Read','MasterApp:Offer:Read','Anyone with this permission can read offer',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(50,'MasterApp','Default','Offer','Update','MasterApp:Offer:Update','Anyone with this permission can update offer',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(51,'MasterApp','Default','Offer','Delete','MasterApp:Offer:Delete','Anyone with this permission can delete offer',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(52,'MasterApp','Default','Offer','Restore','MasterApp:Offer:Restore','Anyone with this permission can restore offer',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(53,'MasterApp','Default','Offer','Action','MasterApp:Offer:Action','Anyone with this permission can change offer status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(54,'MasterApp','Default','Package','Create','MasterApp:Package:Create','Anyone with this permission can create package',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(55,'MasterApp','Default','Package','Read','MasterApp:Package:Read','Anyone with this permission can read package',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(56,'MasterApp','Default','Package','Update','MasterApp:Package:Update','Anyone with this permission can update package',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(57,'MasterApp','Default','Package','Delete','MasterApp:Package:Delete','Anyone with this permission can delete package',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(58,'MasterApp','Default','Package','Restore','MasterApp:Package:Restore','Anyone with this permission can restore package',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(59,'MasterApp','Default','Package','Action','MasterApp:Package:Action','Anyone with this permission can change package status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(60,'MasterApp','Default','Plan','Create','MasterApp:Plan:Create','Anyone with this permission can create plan',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(61,'MasterApp','Default','Plan','Read','MasterApp:Plan:Read','Anyone with this permission can read plan',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(62,'MasterApp','Default','Plan','Update','MasterApp:Plan:Update','Anyone with this permission can update plan',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(63,'MasterApp','Default','Plan','Delete','MasterApp:Plan:Delete','Anyone with this permission can delete plan',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(64,'MasterApp','Default','Plan','Restore','MasterApp:Plan:Restore','Anyone with this permission can restore plan',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(65,'MasterApp','Default','Plan','Action','MasterApp:Plan:Action','Anyone with this permission can change plan status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(66,'MasterApp','Default','Subscription','Create','MasterApp:Subscription:Create','Anyone with this permission can create subscription',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(67,'MasterApp','Default','Subscription','Read','MasterApp:Subscription:Read','Anyone with this permission can read subscription',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(68,'MasterApp','Default','Subscription','Update','MasterApp:Subscription:Update','Anyone with this permission can update subscription',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(69,'MasterApp','Default','Subscription','Delete','MasterApp:Subscription:Delete','Anyone with this permission can delete subscription',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(70,'MasterApp','Default','Subscription','Restore','MasterApp:Subscription:Restore','Anyone with this permission can restore subscription',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(71,'MasterApp','Default','Subscription','Action','MasterApp:Subscription:Action','Anyone with this permission can change subscription status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(72,'MasterApp','Default','License','Create','MasterApp:License:Create','Anyone with this permission can create license',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(73,'MasterApp','Default','License','Read','MasterApp:License:Read','Anyone with this permission can read license',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(74,'MasterApp','Default','License','Update','MasterApp:License:Update','Anyone with this permission can update license',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(75,'MasterApp','Default','License','Delete','MasterApp:License:Delete','Anyone with this permission can delete license',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(76,'MasterApp','Default','License','Restore','MasterApp:License:Restore','Anyone with this permission can restore license',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(77,'MasterApp','Default','License','Action','MasterApp:License:Action','Anyone with this permission can change license status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(78,'TaskHoper','Default','Meeting','Create','TaskHoper:Meeting:Create','Anyone with this permission can create meeting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(79,'TaskHoper','Default','Meeting','Read','TaskHoper:Meeting:Read','Anyone with this permission can read meeting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(80,'TaskHoper','Default','Meeting','Update','TaskHoper:Meeting:Update','Anyone with this permission can update meeting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(81,'TaskHoper','Default','Meeting','Delete','TaskHoper:Meeting:Delete','Anyone with this permission can delete meeting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(82,'TaskHoper','Default','Meeting','Restore','TaskHoper:Meeting:Restore','Anyone with this permission can restore meeting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(83,'TaskHoper','Default','Meeting','Action','TaskHoper:Meeting:Action','Anyone with this permission can change meeting status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(84,'TaskHoper','Default','MeetingVenue','Create','TaskHoper:MeetingVenue:Create','Anyone with this permission can create meeting venue',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(85,'TaskHoper','Default','MeetingVenue','Read','TaskHoper:MeetingVenue:Read','Anyone with this permission can read meeting venue',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(86,'TaskHoper','Default','MeetingVenue','Update','TaskHoper:MeetingVenue:Update','Anyone with this permission can update meeting venue',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(87,'TaskHoper','Default','MeetingVenue','Delete','TaskHoper:MeetingVenue:Delete','Anyone with this permission can delete meeting venue',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(88,'TaskHoper','Default','MeetingVenue','Restore','TaskHoper:MeetingVenue:Restore','Anyone with this permission can restore meeting venue',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(89,'TaskHoper','Default','MeetingVenue','Action','TaskHoper:MeetingVenue:Action','Anyone with this permission can change meeting venue status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(90,'TaskHoper','Default','MeetingType','Create','TaskHoper:MeetingType:Create','Anyone with this permission can create meeting type',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(91,'TaskHoper','Default','MeetingType','Read','TaskHoper:MeetingType:Read','Anyone with this permission can read meeting type',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(92,'TaskHoper','Default','MeetingType','Update','TaskHoper:MeetingType:Update','Anyone with this permission can update meeting type',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(93,'TaskHoper','Default','MeetingType','Delete','TaskHoper:MeetingType:Delete','Anyone with this permission can delete meeting type',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(94,'TaskHoper','Default','MeetingType','Restore','TaskHoper:MeetingType:Restore','Anyone with this permission can restore meeting type',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(95,'TaskHoper','Default','MeetingType','Action','TaskHoper:MeetingType:Action','Anyone with this permission can change meeting type status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(96,'TaskHoper','Default','MeetingTask','Create','TaskHoper:MeetingTask:Create','Anyone with this permission can create meeting task',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(97,'TaskHoper','Default','MeetingTask','Read','TaskHoper:MeetingTask:Read','Anyone with this permission can read meeting task',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(98,'TaskHoper','Default','MeetingTask','Update','TaskHoper:MeetingTask:Update','Anyone with this permission can update meeting task',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(99,'TaskHoper','Default','MeetingTask','Delete','TaskHoper:MeetingTask:Delete','Anyone with this permission can delete meeting task',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(100,'TaskHoper','Default','MeetingTask','Restore','TaskHoper:MeetingTask:Restore','Anyone with this permission can restore meeting task',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(101,'TaskHoper','Default','MeetingTask','Action','TaskHoper:MeetingTask:Action','Anyone with this permission can change meeting task status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(102,'TaskHoper','Default','MeetingNote','Create','TaskHoper:MeetingNote:Create','Anyone with this permission can create meeting note',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(103,'TaskHoper','Default','MeetingNote','Read','TaskHoper:MeetingNote:Read','Anyone with this permission can read meeting note',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(104,'TaskHoper','Default','MeetingNote','Update','TaskHoper:MeetingNote:Update','Anyone with this permission can update meeting note',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(105,'TaskHoper','Default','MeetingNote','Delete','TaskHoper:MeetingNote:Delete','Anyone with this permission can delete meeting note',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(106,'TaskHoper','Default','MeetingNote','Restore','TaskHoper:MeetingNote:Restore','Anyone with this permission can restore meeting note',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(107,'TaskHoper','Default','MeetingNote','Action','TaskHoper:MeetingNote:Action','Anyone with this permission can change meeting note status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(108,'TaskHoper','Default','MeetingNotePad','Create','TaskHoper:MeetingNotePad:Create','Anyone with this permission can create meeting note pad',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(109,'TaskHoper','Default','MeetingNotePad','Read','TaskHoper:MeetingNotePad:Read','Anyone with this permission can read meeting note pad',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(110,'TaskHoper','Default','MeetingNotePad','Update','TaskHoper:MeetingNotePad:Update','Anyone with this permission can update meeting note pad',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(111,'TaskHoper','Default','MeetingNotePad','Delete','TaskHoper:MeetingNotePad:Delete','Anyone with this permission can delete meeting note pad',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(112,'TaskHoper','Default','MeetingNotePad','Restore','TaskHoper:MeetingNotePad:Restore','Anyone with this permission can restore meeting note pad',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(113,'TaskHoper','Default','MeetingNotePad','Action','TaskHoper:MeetingNotePad:Action','Anyone with this permission can change meeting note pad status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(114,'TaskHoper','Default','MeetingFollowUp','Create','TaskHoper:MeetingFollowUp:Create','Anyone with this permission can create meeting follow up',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(115,'TaskHoper','Default','MeetingFollowUp','Read','TaskHoper:MeetingFollowUp:Read','Anyone with this permission can red meeting follow up',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(116,'TaskHoper','Default','MeetingFollowUp','Update','TaskHoper:MeetingFollowUp:Update','Anyone with this permission can update meeting follow up',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(117,'TaskHoper','Default','MeetingFollowUp','Delete','TaskHoper:MeetingFollowUp:Delete','Anyone with this permission can delete meeting follow up',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(118,'TaskHoper','Default','MeetingFollowUp','Restore','TaskHoper:MeetingFollowUp:Restore','Anyone with this permission can restore meeting follow up',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(119,'TaskHoper','Default','MeetingFollowUp','Action','TaskHoper:MeetingFollowUp:Action','Anyone with this permission can action meeting follow up',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(120,'VehicleApp','Default','Vehicle','Create','VehicleApp:Vehicle:Create','Anyone with this permission can create a vehicle',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(121,'VehicleApp','Default','Vehicle','Read','VehicleApp:Vehicle:Read','Anyone with this permission can read vehicle details',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(122,'VehicleApp','Default','Vehicle','Update','VehicleApp:Vehicle:Update','Anyone with this permission can update vehicle details',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(123,'VehicleApp','Default','Vehicle','Delete','VehicleApp:Vehicle:Delete','Anyone with this permission can delete a vehicle',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(124,'VehicleApp','Default','Vehicle','Restore','VehicleApp:Vehicle:Restore','Anyone with this permission can restore Vehicle note',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(125,'VehicleApp','Default','Vehicle','Action','VehicleApp:Vehicle:Action','Anyone with this permission can change Vehicle note status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(126,'VehicleApp','Default','VehicleBreakdown','Create','VehicleApp:VehicleBreakdown:Create','Anyone with this permission can create a vehicle breakdown record',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(127,'VehicleApp','Default','VehicleBreakdown','Read','VehicleApp:VehicleBreakdown:Read','Anyone with this permission can read vehicle breakdown details',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(128,'VehicleApp','Default','VehicleBreakdown','Update','VehicleApp:VehicleBreakdown:Update','Anyone with this permission can update vehicle breakdown details',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(129,'VehicleApp','Default','VehicleBreakdown','Delete','VehicleApp:VehicleBreakdown:Delete','Anyone with this permission can delete a vehicle breakdown record',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(130,'VehicleApp','Default','VehicleBreakdown','Restore','VehicleApp:VehicleBreakdown:Restore','Anyone with this permission can restore vehicle breakdown record',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(131,'VehicleApp','Default','VehicleBreakdown','Action','VehicleApp:VehicleBreakdown:Action','Anyone with this permission can change vehicle breakdown status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(132,'VehicleApp','Default','VehicleExpense','Create','VehicleApp:VehicleExpense:Create','Anyone with this permission can create a vehicle expense record',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(133,'VehicleApp','Default','VehicleExpense','Read','VehicleApp:VehicleExpense:Read','Anyone with this permission can read vehicle expense details',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(134,'VehicleApp','Default','VehicleExpense','Update','VehicleApp:VehicleExpense:Update','Anyone with this permission can update vehicle expense details',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(135,'VehicleApp','Default','VehicleExpense','Delete','VehicleApp:VehicleExpense:Delete','Anyone with this permission can delete a vehicle expense record',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(136,'VehicleApp','Default','VehicleExpense','Restore','VehicleApp:VehicleExpense:Restore','Anyone with this permission can restore vehicle expense record',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(137,'VehicleApp','Default','VehicleExpense','Action','VehicleApp:VehicleExpense:Action','Anyone with this permission can change vehicle expense status',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(138,'MaterialApp','Default','Warehouse','Create','MaterialApp:Warehouse:Create','Anyone with this permission can create warehouse',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(139,'MaterialApp','Default','Warehouse','Read','MaterialApp:Warehouse:Read','Anyone with this permission can read warehouse',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(140,'MaterialApp','Default','Warehouse','Update','MaterialApp:Warehouse:Update','Anyone with this permission can update warehouse',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(141,'MaterialApp','Default','Warehouse','Delete','MaterialApp:Warehouse:Delete','Anyone with this permission can delete warehouse',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(142,'MaterialApp','Default','Warehouse','Restore','MaterialApp:Warehouse:Restore','Anyone with this permission can restore warehouse',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(143,'MaterialApp','Default','Warehouse','Action','MaterialApp:Warehouse:Action','Anyone with this permission can perform warehouse actions',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(144,'MaterialApp','Default','Unit','Create','MaterialApp:Unit:Create','Anyone with this permission can create unit',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(145,'MaterialApp','Default','Unit','Read','MaterialApp:Unit:Read','Anyone with this permission can read unit',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(146,'MaterialApp','Default','Unit','Update','MaterialApp:Unit:Update','Anyone with this permission can update unit',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(147,'MaterialApp','Default','Unit','Delete','MaterialApp:Unit:Delete','Anyone with this permission can delete unit',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(148,'MaterialApp','Default','Unit','Restore','MaterialApp:Unit:Restore','Anyone with this permission can restore unit',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(149,'MaterialApp','Default','Unit','Action','MaterialApp:Unit:Action','Anyone with this permission can perform unit actions',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(150,'MaterialApp','Default','Category','Create','MaterialApp:Category:Create','Anyone with this permission can create category',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(151,'MaterialApp','Default','Category','Read','MaterialApp:Category:Read','Anyone with this permission can read category',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(152,'MaterialApp','Default','Category','Update','MaterialApp:Category:Update','Anyone with this permission can update category',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(153,'MaterialApp','Default','Category','Delete','MaterialApp:Category:Delete','Anyone with this permission can delete category',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(154,'MaterialApp','Default','Category','Restore','MaterialApp:Category:Restore','Anyone with this permission can restore category',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(155,'MaterialApp','Default','Category','Action','MaterialApp:Category:Action','Anyone with this permission can perform category actions',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(156,'MaterialApp','Default','AppSetting','Read','MaterialApp:AppSetting:Read','Anyone with this permission can read app setting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(157,'MaterialApp','Default','AppSetting','Update','MaterialApp:AppSetting:Update','Anyone with this permission can update app setting',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(158,'MaterialApp','Default','Supplier','Create','MaterialApp:Supplier:Create','Anyone with this permission can create supplier',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(159,'MaterialApp','Default','Supplier','Read','MaterialApp:Supplier:Read','Anyone with this permission can read supplier',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(160,'MaterialApp','Default','Supplier','Update','MaterialApp:Supplier:Update','Anyone with this permission can update supplier',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(161,'MaterialApp','Default','Supplier','Delete','MaterialApp:Supplier:Delete','Anyone with this permission can delete supplier',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(162,'MaterialApp','Default','Supplier','Restore','MaterialApp:Supplier:Restore','Anyone with this permission can restore supplier',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(163,'MaterialApp','Default','Supplier','Action','MaterialApp:Supplier:Action','Anyone with this permission can perform supplier actions',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(164,'MaterialApp','Default','Material','Create','MaterialApp:Material:Create','Anyone with this permission can create material',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(165,'MaterialApp','Default','Material','Read','MaterialApp:Material:Read','Anyone with this permission can read material',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(166,'MaterialApp','Default','Material','Update','MaterialApp:Material:Update','Anyone with this permission can update material',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(167,'MaterialApp','Default','Material','Delete','MaterialApp:Material:Delete','Anyone with this permission can delete material',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(168,'MaterialApp','Default','Material','Restore','MaterialApp:Material:Restore','Anyone with this permission can restore material',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(169,'MaterialApp','Default','Material','Action','MaterialApp:Material:Action','Anyone with this permission can perform material actions',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(170,'MaterialApp','Default','Inventory','Create','MaterialApp:Inventory:Create','Anyone with this permission can create inventory',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(171,'MaterialApp','Default','Inventory','Read','MaterialApp:Inventory:Read','Anyone with this permission can read inventory',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(172,'MaterialApp','Default','Inventory','Update','MaterialApp:Inventory:Update','Anyone with this permission can update inventory',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(173,'MaterialApp','Default','Inventory','Delete','MaterialApp:Inventory:Delete','Anyone with this permission can delete inventory',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(174,'MaterialApp','Default','Inventory','Restore','MaterialApp:Inventory:Restore','Anyone with this permission can restore inventory',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(175,'MaterialApp','Default','Inventory','Action','MaterialApp:Inventory:Action','Anyone with this permission can perform inventory actions',NULL,NULL,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=526 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
INSERT INTO `role_permissions` VALUES (1,1,1,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(2,1,2,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(3,1,3,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(4,1,4,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(5,1,5,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(6,1,6,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(7,1,7,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(8,1,8,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(9,1,9,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(10,1,10,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(11,1,11,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(12,1,12,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(13,1,13,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(14,1,14,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(15,1,15,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(16,1,16,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(17,1,17,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(18,1,18,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(19,1,19,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(20,1,20,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(21,1,21,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(22,1,22,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(23,1,23,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(24,1,24,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(25,1,25,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(26,1,26,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(27,1,27,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(28,1,28,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(29,1,29,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(30,1,30,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(31,1,31,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(32,1,32,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(33,1,33,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(34,1,34,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(35,1,35,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(36,1,36,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(37,1,37,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(38,1,38,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(39,1,39,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(40,1,40,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(41,1,41,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(42,1,42,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(43,1,43,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(44,1,44,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(45,1,45,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(46,1,46,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(47,1,47,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(48,1,48,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(49,1,49,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(50,1,50,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(51,1,51,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(52,1,52,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(53,1,53,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(54,1,54,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(55,1,55,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(56,1,56,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(57,1,57,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(58,1,58,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(59,1,59,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(60,1,60,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(61,1,61,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(62,1,62,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(63,1,63,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(64,1,64,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(65,1,65,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(66,1,66,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(67,1,67,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(68,1,68,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(69,1,69,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(70,1,70,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(71,1,71,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(72,1,72,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(73,1,73,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(74,1,74,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(75,1,75,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(76,1,76,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(77,1,77,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(78,1,78,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(79,1,79,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(80,1,80,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(81,1,81,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(82,1,82,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(83,1,83,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(84,1,84,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(85,1,85,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(86,1,86,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(87,1,87,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(88,1,88,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(89,1,89,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(90,1,90,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(91,1,91,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(92,1,92,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(93,1,93,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(94,1,94,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(95,1,95,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(96,1,96,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(97,1,97,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(98,1,98,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(99,1,99,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(100,1,100,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(101,1,101,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(102,1,102,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(103,1,103,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(104,1,104,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(105,1,105,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(106,1,106,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(107,1,107,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(108,1,108,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(109,1,109,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(110,1,110,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(111,1,111,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(112,1,112,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(113,1,113,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(114,1,114,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(115,1,115,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(116,1,116,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(117,1,117,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(118,1,118,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(119,1,119,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(120,1,120,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(121,1,121,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(122,1,122,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(123,1,123,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(124,1,124,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(125,1,125,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(126,1,126,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(127,1,127,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(128,1,128,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(129,1,129,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(130,1,130,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(131,1,131,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(132,1,132,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(133,1,133,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(134,1,134,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(135,1,135,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(136,1,136,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(137,1,137,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(138,1,138,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(139,1,139,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(140,1,140,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(141,1,141,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(142,1,142,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(143,1,143,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(144,1,144,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(145,1,145,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(146,1,146,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(147,1,147,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(148,1,148,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(149,1,149,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(150,1,150,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(151,1,151,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(152,1,152,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(153,1,153,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(154,1,154,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(155,1,155,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(156,1,156,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(157,1,157,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(158,1,158,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(159,1,159,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(160,1,160,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(161,1,161,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(162,1,162,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(163,1,163,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(164,1,164,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(165,1,165,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(166,1,166,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(167,1,167,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(168,1,168,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(169,1,169,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(170,1,170,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(171,1,171,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(172,1,172,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(173,1,173,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(174,1,174,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(175,1,175,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(176,2,1,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(177,2,2,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(178,2,3,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(179,2,4,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(180,2,5,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(181,2,6,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(182,2,7,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(183,2,8,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(184,2,9,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(185,2,10,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(186,2,11,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(187,2,12,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(188,2,13,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(189,2,14,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(190,2,15,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(191,2,16,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(192,2,17,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(193,2,18,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(194,2,19,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(195,2,20,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(196,2,21,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(197,2,22,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(198,2,23,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(199,2,24,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(200,2,25,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(201,2,26,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(202,2,27,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(203,2,28,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(204,2,29,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(205,2,30,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(206,2,31,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(207,2,32,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(208,2,33,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(209,2,34,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(210,2,35,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(211,2,36,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(212,2,37,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(213,2,38,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(214,2,39,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(215,2,40,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(216,2,41,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(217,2,42,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(218,2,43,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(219,2,44,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(220,2,45,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(221,2,46,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(222,2,47,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(223,2,48,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(224,2,49,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(225,2,50,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(226,2,51,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(227,2,52,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(228,2,53,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(229,2,54,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(230,2,55,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(231,2,56,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(232,2,57,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(233,2,58,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(234,2,59,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(235,2,60,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(236,2,61,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(237,2,62,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(238,2,63,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(239,2,64,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(240,2,65,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(241,2,66,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(242,2,67,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(243,2,68,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(244,2,69,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(245,2,70,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(246,2,71,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(247,2,72,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(248,2,73,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(249,2,74,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(250,2,75,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(251,2,76,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(252,2,77,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(253,2,78,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(254,2,79,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(255,2,80,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(256,2,81,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(257,2,82,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(258,2,83,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(259,2,84,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(260,2,85,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(261,2,86,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(262,2,87,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(263,2,88,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(264,2,89,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(265,2,90,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(266,2,91,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(267,2,92,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(268,2,93,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(269,2,94,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(270,2,95,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(271,2,96,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(272,2,97,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(273,2,98,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(274,2,99,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(275,2,100,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(276,2,101,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(277,2,102,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(278,2,103,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(279,2,104,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(280,2,105,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(281,2,106,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(282,2,107,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(283,2,108,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(284,2,109,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(285,2,110,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(286,2,111,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(287,2,112,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(288,2,113,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(289,2,114,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(290,2,115,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(291,2,116,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(292,2,117,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(293,2,118,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(294,2,119,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(295,2,120,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(296,2,121,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(297,2,122,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(298,2,123,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(299,2,124,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(300,2,125,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(301,2,126,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(302,2,127,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(303,2,128,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(304,2,129,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(305,2,130,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(306,2,131,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(307,2,132,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(308,2,133,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(309,2,134,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(310,2,135,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(311,2,136,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(312,2,137,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(313,2,138,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(314,2,139,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(315,2,140,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(316,2,141,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(317,2,142,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(318,2,143,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(319,2,144,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(320,2,145,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(321,2,146,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(322,2,147,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(323,2,148,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(324,2,149,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(325,2,150,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(326,2,151,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(327,2,152,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(328,2,153,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(329,2,154,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(330,2,155,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(331,2,156,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(332,2,157,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(333,2,158,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(334,2,159,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(335,2,160,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(336,2,161,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(337,2,162,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(338,2,163,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(339,2,164,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(340,2,165,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(341,2,166,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(342,2,167,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(343,2,168,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(344,2,169,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(345,2,170,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(346,2,171,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(347,2,172,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(348,2,173,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(349,2,174,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(350,2,175,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(351,3,1,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(352,3,2,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(353,3,3,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(354,3,4,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(355,3,5,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(356,3,6,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(357,3,7,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(358,3,8,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(359,3,9,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(360,3,10,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(361,3,11,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(362,3,12,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(363,3,13,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(364,3,14,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(365,3,15,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(366,3,16,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(367,3,17,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(368,3,18,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(369,3,19,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(370,3,20,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(371,3,21,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(372,3,22,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(373,3,23,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(374,3,24,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(375,3,25,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(376,3,26,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(377,3,27,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(378,3,28,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(379,3,29,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(380,3,30,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(381,3,31,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(382,3,32,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(383,3,33,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(384,3,34,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(385,3,35,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(386,3,36,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(387,3,37,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(388,3,38,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(389,3,39,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(390,3,40,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(391,3,41,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(392,3,42,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(393,3,43,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(394,3,44,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(395,3,45,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(396,3,46,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(397,3,47,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(398,3,48,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(399,3,49,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(400,3,50,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(401,3,51,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(402,3,52,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(403,3,53,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(404,3,54,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(405,3,55,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(406,3,56,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(407,3,57,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(408,3,58,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(409,3,59,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(410,3,60,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(411,3,61,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(412,3,62,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(413,3,63,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(414,3,64,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(415,3,65,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(416,3,66,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(417,3,67,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(418,3,68,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(419,3,69,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(420,3,70,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(421,3,71,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(422,3,72,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(423,3,73,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(424,3,74,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(425,3,75,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(426,3,76,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(427,3,77,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(428,3,78,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(429,3,79,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(430,3,80,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(431,3,81,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(432,3,82,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(433,3,83,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(434,3,84,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(435,3,85,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(436,3,86,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(437,3,87,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(438,3,88,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(439,3,89,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(440,3,90,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(441,3,91,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(442,3,92,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(443,3,93,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(444,3,94,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(445,3,95,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(446,3,96,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(447,3,97,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(448,3,98,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(449,3,99,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(450,3,100,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(451,3,101,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(452,3,102,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(453,3,103,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(454,3,104,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(455,3,105,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(456,3,106,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(457,3,107,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(458,3,108,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(459,3,109,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(460,3,110,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(461,3,111,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(462,3,112,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(463,3,113,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(464,3,114,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(465,3,115,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(466,3,116,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(467,3,117,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(468,3,118,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(469,3,119,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(470,3,120,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(471,3,121,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(472,3,122,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(473,3,123,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(474,3,124,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(475,3,125,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(476,3,126,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(477,3,127,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(478,3,128,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(479,3,129,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(480,3,130,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(481,3,131,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(482,3,132,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(483,3,133,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(484,3,134,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(485,3,135,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(486,3,136,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(487,3,137,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(488,3,138,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(489,3,139,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(490,3,140,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(491,3,141,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(492,3,142,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(493,3,143,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(494,3,144,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(495,3,145,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(496,3,146,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(497,3,147,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(498,3,148,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(499,3,149,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(500,3,150,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(501,3,151,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(502,3,152,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(503,3,153,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(504,3,154,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(505,3,155,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(506,3,156,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(507,3,157,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(508,3,158,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(509,3,159,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(510,3,160,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(511,3,161,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(512,3,162,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(513,3,163,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(514,3,164,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(515,3,165,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(516,3,166,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(517,3,167,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(518,3,168,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(519,3,169,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(520,3,170,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(521,3,171,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(522,3,172,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(523,3,173,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(524,3,174,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(525,3,175,'2026-02-26 12:28:21','2026-02-26 12:28:21',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin','Admin Role',1,'admin',1,'active','2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(2,'primary_organization_admin_role','Organization Admin Role',1,'organization-admin',1,'active','2026-02-26 12:28:21','2026-02-26 12:28:21',NULL),(3,'primary_organization_employee_role','Organization Employee Role',1,'organization-employee',1,'active','2026-02-26 12:28:21','2026-02-26 12:28:21',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_user_email` (`username`,`email`),
  KEY `idx_org_id` (`organizationId`),
  KEY `idx_parent_id` (`parentId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`organizationId`) REFERENCES `organizations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`parentId`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2026-02-26 17:58:59
