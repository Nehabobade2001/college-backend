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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1730561320000,'Organizations1730561320000'),(2,1730561332780,'Permissions1730561332780'),(3,1730561340421,'Roles1730561340421'),(4,1730561346366,'Users1730561346366'),(5,1740242603000,'CreateOtpTable1740242603000'),(6,1740243000000,'MasterManagementTables1740243000000'),(7,1740245000000,'CreateCourseTables1740245000000');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
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
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
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
  KEY `idx_status` (`status`),
  KEY `idx_exam` (`examName`),
  KEY `idx_academic_year` (`academicYear`)
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
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
  `streamId` int(11) NOT NULL,
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

-- Dump completed on 2026-02-25  0:07:54
