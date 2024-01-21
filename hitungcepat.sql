-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: hitungcepat
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `caleg`
--

DROP TABLE IF EXISTS `caleg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caleg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_caleg` varchar(50) COLLATE armscii8_bin DEFAULT '0',
  `no_urut` int DEFAULT '0',
  `foto` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `partai_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caleg`
--

LOCK TABLES `caleg` WRITE;
/*!40000 ALTER TABLE `caleg` DISABLE KEYS */;
INSERT INTO `caleg` VALUES (1,'LA ODE HASRUDDIN, S.T',1,NULL,1),(2,'LA JAOGAMU',2,NULL,1),(3,'RAFIKA DURI',3,NULL,1),(4,'LA HATU, S.H',4,NULL,1),(5,'WA NDRIANI',5,NULL,1),(6,'LA NARE, S. Pd',6,NULL,1),(7,'LA AIJI',1,NULL,2),(8,'HERMAN',2,NULL,2),(9,'DECI SRIAWATI, A.Md.Keb',3,NULL,2),(10,'WA ANDIKA',4,NULL,2),(11,'AMRULLAH, S.I.P.',5,NULL,2),(12,'LA ODE TAUFIK MANSUR',6,NULL,2),(13,'DODI HASRI, S.Pd.',1,NULL,3),(14,'DURNIA, S.E.',2,NULL,3),(15,'LA ODE SAHRUL',3,NULL,3),(16,'YAHYA, S.Pd.',4,NULL,3),(17,'NABILA SALAM',5,NULL,3),(18,'HARMANTON',6,NULL,3),(19,'LA NIHU',1,NULL,4),(20,'ARIF JAU, S.Ag.',2,NULL,4),(21,'WA SINTA',3,NULL,4),(22,'SARIFUDIN',4,NULL,4),(23,'LA ODE RUSLAN',5,NULL,4),(24,'WA MARI',6,NULL,4),(25,'DARMANI, S.Pd., M.Sos.',1,NULL,5),(26,'LA ODE SUGIANTO, S.Pd., M.M.',2,NULL,5),(27,'MARTINI, S.SosI.',3,NULL,5),(28,'Dr. ALI ROSDIN, S.Pd., M.Hum.',4,NULL,5),(29,'ETIA NINGSI',5,NULL,5),(30,'SLAMET, S.Pd.',6,NULL,5),(31,'WA AUA',1,NULL,8),(32,'ALDIN',2,NULL,8),(33,'HABIBI, S.IP.',3,NULL,8),(34,'INDRIANI J.',4,NULL,8),(35,'LA WALI',5,NULL,8),(36,'EKO SAPUTRA',6,NULL,8),(37,'LA ODE ASRI, S.Pi.',1,NULL,9),(38,'LA DUHANI, S.Sos.',2,NULL,9),(39,'ROSMAYANTI',3,NULL,9),(40,'UMAR TAMA',4,NULL,9),(41,'LA KURNIAWAN, S.Pd.',5,NULL,9),(42,'TITIN',6,NULL,9),(43,'ALIADI, S.Pd.',1,NULL,10),(44,'LA JANURU, S.IP., M.IP.',2,NULL,10),(45,'WA SENDI',3,NULL,10),(46,'L.ABBAS MATASORUMBA, S.E., S.H.',4,NULL,10),(47,'RUDIANTO, A.Md.',5,NULL,10),(48,'ENDANG',6,NULL,10),(49,'LA ODE BAHARUDDIN',1,NULL,12),(50,'LA ICA',2,NULL,12),(51,'SUTRI KASMUDIN',3,NULL,12),(52,'RIKA SARTIKA',4,NULL,12),(53,'APRILUDIN, S.H.',5,NULL,12),(54,'EFFENDI KAIMUDIN',6,NULL,12),(55,'RISKI GHAZALI, S.Sos.',1,NULL,13),(56,'SARTINA',2,NULL,13),(57,'MIRNA',3,NULL,13),(58,'SUPRIONO',4,NULL,13),(59,'WA TANTRI',5,NULL,13),(60,'LA IKMAL SANDY',6,NULL,13),(61,'LA HURU',1,NULL,16),(62,'LA RUBI, S.E.',2,NULL,16),(63,'MELKI',3,NULL,16),(64,'LA IDA',4,NULL,16),(65,'LA ARSI',5,NULL,16),(66,'WA ECU',6,NULL,16);
/*!40000 ALTER TABLE `caleg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partai`
--

DROP TABLE IF EXISTS `partai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partai` (
  `no_partai` int NOT NULL,
  `nama_partai` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`no_partai`)
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partai`
--

LOCK TABLES `partai` WRITE;
/*!40000 ALTER TABLE `partai` DISABLE KEYS */;
INSERT INTO `partai` VALUES (1,'Partai Kebangkitan Bangsa (PKB'),(2,'Partai Gerakan Indonesia Raya (Gerindra)'),(3,'PDI Perjuangan'),(4,'Partai Golongan Karya (Golkar)'),(5,'Partai NasDem'),(6,'Partai Buruh'),(7,'Partai Gelombang Rakyat Indonesia (Gelora)'),(8,'Partai Keadilan Sejahtera (PKS)'),(9,'Partai Kebangkitan Nusantara (PKN)'),(10,'Partai Hati Nurani Rakyat (Hanura)'),(11,'Partai Garda Perubahan Indonesia (Garuda) '),(12,'Partai Amanat Nasional (PAN)'),(13,'Partai Bulan Bintang (PBB)'),(14,'Partai Demokrat '),(15,'Partai Solidaritas Indonesia (PSI)'),(16,'Partai Persatuan Indonesia (Perindo)'),(17,'Partai Persatuan Pembangunan (PPP)');
/*!40000 ALTER TABLE `partai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `saksi`
--

DROP TABLE IF EXISTS `saksi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `saksi` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nama_lengkap` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `tempat_lahir` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `no_hp` varchar(14) COLLATE armscii8_bin DEFAULT NULL,
  `lokasi_tugas` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `tps_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `saksi`
--

LOCK TABLES `saksi` WRITE;
/*!40000 ALTER TABLE `saksi` DISABLE KEYS */;
INSERT INTO `saksi` VALUES (1,'Hayatul Habirun',NULL,NULL,'6281342726770','Burangasi',1),(2,'Ansar',NULL,NULL,'6282284223527','Burangasi',2);
/*!40000 ALTER TABLE `saksi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suara`
--

DROP TABLE IF EXISTS `suara`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suara` (
  `id` int NOT NULL AUTO_INCREMENT,
  `saksi_id` int DEFAULT '0',
  `caleg_id` int DEFAULT '0',
  `tps_id` bigint DEFAULT '0',
  `jumlah` bigint DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suara`
--

LOCK TABLES `suara` WRITE;
/*!40000 ALTER TABLE `suara` DISABLE KEYS */;
INSERT INTO `suara` VALUES (1,1,19,1,29),(2,1,37,1,30),(3,1,61,1,20),(4,1,3,1,76),(5,1,6,1,56),(6,1,7,1,23),(7,1,1,1,23),(8,2,49,2,599),(9,2,19,2,70),(10,2,31,2,45),(11,1,66,1,34),(12,1,2,1,12),(13,1,4,1,23),(14,1,5,1,23),(15,1,8,1,14),(16,1,51,1,12),(17,1,49,1,45),(18,1,50,1,34);
/*!40000 ALTER TABLE `suara` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tps`
--

DROP TABLE IF EXISTS `tps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_tps` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin NOT NULL DEFAULT '0',
  `desa_kelurahan` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tps`
--

LOCK TABLES `tps` WRITE;
/*!40000 ALTER TABLE `tps` DISABLE KEYS */;
INSERT INTO `tps` VALUES (1,'1','Burangasi'),(2,'2','Burangasi'),(3,'3','Burangasi');
/*!40000 ALTER TABLE `tps` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-22  0:09:52
