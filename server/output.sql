-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: perrinder
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=372 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (368,'$2b$10$N/S9ksPX.GSvKB3Vh0AznOA6HGrqOxB9JgO44pP96Xl4JtKNoL1s6','bymarquezz2@gmail.com'),(369,'$2b$10$2tO3gVKJ4YDSTrLtcGnR1.7vkarOo3teMUSHsWLqpURt3e7BzH8ou','pacopepe@gmail.com'),(370,'$2b$10$zxyq61.N12tOihKEih.ZEO3Gqlz3bWPbb1kzzrxybhwB484xd.BRS','joseangelmr2004@gmail.com'),(371,'$2b$10$J4ZwwMjM/paSPqENcoy4iucxwFnoVZLSCtyQUjqe4k9trc1OAmZ8q','felipondios@gmail.com');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat_rooms`
--

DROP TABLE IF EXISTS `chat_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `user1Id` int DEFAULT NULL,
  `user2Id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2322dead09ed7e80fa319b34173` (`user1Id`),
  KEY `FK_e6680ec6f61be06769227e9c995` (`user2Id`),
  CONSTRAINT `FK_2322dead09ed7e80fa319b34173` FOREIGN KEY (`user1Id`) REFERENCES `users` (`id`),
  CONSTRAINT `FK_e6680ec6f61be06769227e9c995` FOREIGN KEY (`user2Id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_rooms`
--

LOCK TABLES `chat_rooms` WRITE;
/*!40000 ALTER TABLE `chat_rooms` DISABLE KEYS */;
INSERT INTO `chat_rooms` VALUES (1,'2024-05-27 17:17:02.858854',7,1);
/*!40000 ALTER TABLE `chat_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dislike`
--

DROP TABLE IF EXISTS `dislike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dislike` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user1Id` int NOT NULL,
  `user2Id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dislike`
--

LOCK TABLES `dislike` WRITE;
/*!40000 ALTER TABLE `dislike` DISABLE KEYS */;
INSERT INTO `dislike` VALUES (1,8,1),(2,9,1),(3,9,1),(4,9,1),(5,9,1),(6,9,1);
/*!40000 ALTER TABLE `dislike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user1Id` int NOT NULL,
  `user2Id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (10,1,7),(11,7,1);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `senderId` int DEFAULT NULL,
  `chatRoomId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2db9cf2b3ca111742793f6c37ce` (`senderId`),
  KEY `FK_05cc073f1a70e468e3ee1b4ba98` (`chatRoomId`),
  CONSTRAINT `FK_05cc073f1a70e468e3ee1b4ba98` FOREIGN KEY (`chatRoomId`) REFERENCES `chat_rooms` (`id`),
  CONSTRAINT `FK_2db9cf2b3ca111742793f6c37ce` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,'Asd','2024-05-20 17:37:20.982238',1,NULL),(2,'','2024-05-20 17:38:41.829827',1,NULL),(3,'Asdasd','2024-05-20 17:38:46.800114',1,NULL),(4,'Hola','2024-05-27 17:45:11.226187',1,1),(5,'Hola','2024-05-27 17:49:59.882932',1,1),(6,'Asd','2024-05-27 18:17:23.357906',1,1),(7,'S','2024-05-27 18:18:21.015848',1,1),(8,'Hola','2024-05-27 18:21:46.632929',1,1),(9,'Que tal','2024-05-27 18:21:52.890823',7,1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pets`
--

DROP TABLE IF EXISTS `pets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `breed` varchar(255) NOT NULL,
  `weight` varchar(255) NOT NULL,
  `age` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_a9f39dd54113410cdd3a04e80eb` (`userId`),
  CONSTRAINT `FK_a9f39dd54113410cdd3a04e80eb` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pets`
--

LOCK TABLES `pets` WRITE;
/*!40000 ALTER TABLE `pets` DISABLE KEYS */;
INSERT INTO `pets` VALUES (38,'Silver','','','','','','Silver chetado','2024-05-15 16:08:46','2024-05-15 16:08:46',7),(39,'Alfonso','','','','','','Un perro muy bonito y elegante','2024-05-15 16:12:54','2024-05-15 16:12:54',1),(40,'Bonito','','','','','','Es precioso, ha sufrido mucho, quiere amor, denle like','2024-05-18 19:43:07','2024-05-18 19:43:07',8);
/*!40000 ALTER TABLE `pets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(255) NOT NULL,
  `petId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ebda8174dc87b07c7a838740c4b` (`petId`),
  CONSTRAINT `FK_ebda8174dc87b07c7a838740c4b` FOREIGN KEY (`petId`) REFERENCES `pets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (31,'images/1715789325162',38),(32,'images/1715789325232',38),(33,'images/1715789325237',38),(34,'images/1715789325243',38),(35,'images/1715789567063',39),(36,'images/1715789567063',39),(37,'images/1715789567057',39),(38,'images/1716061386751',40),(39,'images/1716061386772',40),(40,'images/1716061386777',40);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Paco','Pepe','666777888','bymarquezz2@gmail.com','123456','2024-02-28 13:10:03','2024-02-28 13:10:03'),(7,'Pedro','Jimenez','666777888','pacopepe@gmail.com','123456','2024-05-07 16:21:42','2024-05-07 16:21:42'),(8,'José Angel ','Márquez Ruiz ','652973265','Joseangelmr2004@gmail.com','1234','2024-05-18 19:32:40','2024-05-18 19:32:40'),(9,'Eduardo','Robespierre','121345541','felipondios@gmail.com','felipondios','2024-05-18 19:50:28','2024-05-18 19:50:28');
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

-- Dump completed on 2024-05-27 18:40:37
