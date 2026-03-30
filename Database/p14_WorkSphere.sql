CREATE DATABASE  IF NOT EXISTS `p14_worksphere` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `p14_worksphere`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: p14_worksphere
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bill`
--

DROP TABLE IF EXISTS `bill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill` (
  `bill_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `tax` decimal(10,2) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `bill_date` date DEFAULT NULL,
  `payment_mode` varchar(30) NOT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `bill_ibfk_1` (`user_id`),
  KEY `bill_ibfk_2` (`service_id`),
  CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`uid`),
  CONSTRAINT `bill_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill`
--

LOCK TABLES `bill` WRITE;
/*!40000 ALTER TABLE `bill` DISABLE KEYS */;
/*!40000 ALTER TABLE `bill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `state_id` int NOT NULL,
  `city_name` varchar(100) NOT NULL,
  PRIMARY KEY (`city_id`),
  KEY `city_ibfk_1` (`state_id`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,1,'Visakhapatnam'),(2,1,'Vijayawada'),(3,1,'Guntur'),(4,1,'Nellore'),(5,1,'Kurnool'),(6,2,'Guwahati'),(7,2,'Silchar'),(8,2,'Dibrugarh'),(9,2,'Jorhat'),(10,2,'Tezpur'),(11,3,'Patna'),(12,3,'Gaya'),(13,3,'Bhagalpur'),(14,3,'Muzaffarpur'),(15,3,'Purnia'),(16,4,'Raipur'),(17,4,'Bhilai'),(18,4,'Bilaspur'),(19,4,'Korba'),(20,4,'Durg'),(21,5,'New Delhi'),(22,5,'Dwarka'),(23,5,'Rohini'),(24,5,'Saket'),(25,5,'Karol Bagh'),(26,6,'Panaji'),(27,6,'Margao'),(28,6,'Vasco da Gama'),(29,6,'Mapusa'),(30,6,'Ponda'),(31,7,'Ahmedabad'),(32,7,'Surat'),(33,7,'Vadodara'),(34,7,'Rajkot'),(35,7,'Bhavnagar'),(36,8,'Gurgaon'),(37,8,'Faridabad'),(38,8,'Panipat'),(39,8,'Ambala'),(40,8,'Karnal'),(41,9,'Shimla'),(42,9,'Dharamshala'),(43,9,'Mandi'),(44,9,'Solan'),(45,9,'Kullu'),(46,10,'Ranchi'),(47,10,'Jamshedpur'),(48,10,'Dhanbad'),(49,10,'Bokaro'),(50,10,'Deoghar'),(51,11,'Bangalore'),(52,11,'Mysore'),(53,11,'Mangalore'),(54,11,'Hubli'),(55,11,'Belgaum'),(56,12,'Thiruvananthapuram'),(57,12,'Kochi'),(58,12,'Kozhikode'),(59,12,'Thrissur'),(60,12,'Kannur'),(61,13,'Bhopal'),(62,13,'Indore'),(63,13,'Jabalpur'),(64,13,'Gwalior'),(65,13,'Ujjain'),(66,14,'Mumbai'),(67,14,'Pune'),(68,14,'Nagpur'),(69,14,'Nashik'),(70,14,'Aurangabad'),(71,15,'Bhubaneswar'),(72,15,'Cuttack'),(73,15,'Rourkela'),(74,15,'Puri'),(75,15,'Sambalpur'),(76,16,'Ludhiana'),(77,16,'Amritsar'),(78,16,'Jalandhar'),(79,16,'Patiala'),(80,16,'Bathinda'),(81,17,'Jaipur'),(82,17,'Jodhpur'),(83,17,'Udaipur'),(84,17,'Kota'),(85,17,'Ajmer'),(86,18,'Chennai'),(87,18,'Coimbatore'),(88,18,'Madurai'),(89,18,'Trichy'),(90,18,'Salem'),(91,19,'Hyderabad'),(92,19,'Warangal'),(93,19,'Nizamabad'),(94,19,'Karimnagar'),(95,19,'Khammam'),(96,20,'Lucknow'),(97,20,'Kanpur'),(98,20,'Varanasi'),(99,20,'Agra'),(100,20,'Noida');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `complaint_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  PRIMARY KEY (`complaint_id`),
  KEY `complaints_ibfk_1` (`user_id`),
  KEY `complaints_ibfk_2` (`service_id`),
  CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`uid`),
  CONSTRAINT `complaints_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `from_user_id` int NOT NULL,
  `to_user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `rating` int NOT NULL,
  `review` varchar(300) DEFAULT NULL,
  `rating_date` date DEFAULT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `rating_ibfk_1` (`from_user_id`),
  KEY `rating_ibfk_2` (`to_user_id`),
  KEY `rating_ibfk_3` (`service_id`),
  CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`from_user_id`) REFERENCES `user` (`uid`),
  CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`to_user_id`) REFERENCES `user` (`uid`),
  CONSTRAINT `rating_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(50) NOT NULL,
  PRIMARY KEY (`rid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Freelancer'),(3,'Client');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `service_name` varchar(100) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Web Development','Building responsive websites using modern frameworks.'),(2,'Graphic Design','Creating logos, banners, and social media posts.'),(3,'Content Writing','Professional blog and article writing services.');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `stateName` varchar(100) NOT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Andhra Pradesh'),(2,'Assam'),(3,'Bihar'),(4,'Chhattisgarh'),(5,'Delhi'),(6,'Goa'),(7,'Gujarat'),(8,'Haryana'),(9,'Himachal Pradesh'),(10,'Jharkhand'),(11,'Karnataka'),(12,'Kerala'),(13,'Madhya Pradesh'),(14,'Maharashtra'),(15,'Odisha'),(16,'Punjab'),(17,'Rajasthan'),(18,'Tamil Nadu'),(19,'Telangana'),(20,'Uttar Pradesh');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `rid` int NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `pass` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `status` int DEFAULT NULL,
  `addr` varchar(200) NOT NULL,
  `state` int NOT NULL,
  `city` int NOT NULL,
  PRIMARY KEY (`uid`),
  KEY `rid` (`rid`),
  KEY `state_idx` (`state`),
  KEY `city_idx` (`city`),
  CONSTRAINT `city` FOREIGN KEY (`city`) REFERENCES `city` (`city_id`),
  CONSTRAINT `rid` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`),
  CONSTRAINT `state` FOREIGN KEY (`state`) REFERENCES `state` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,3,'Vedant','Gawande','vedant@gmail.com','$2a$11$gF53mSq8sfHi6TyO38wyd.8XvwPJ8ZgT5RfMRp5zyL7.Yq2XZKFGK','9999999999',1,'Pune',1,2);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_services`
--

DROP TABLE IF EXISTS `user_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_services` (
  `user_service_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `custom_price` decimal(10,2) NOT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `details` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_service_id`),
  KEY `user_services_ibfk_1` (`user_id`),
  KEY `user_services_ibfk_2` (`service_id`),
  CONSTRAINT `user_services_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`uid`),
  CONSTRAINT `user_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_services`
--

LOCK TABLES `user_services` WRITE;
/*!40000 ALTER TABLE `user_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_services` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-23 19:52:32
