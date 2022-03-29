CREATE DATABASE `reddit_api` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;


CREATE TABLE `reddit_api`.`users` (
  `uuid` VARCHAR(50) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE `post` (
  `uuid` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` varchar(250) NOT NULL,
  `createddate` datetime DEFAULT NULL,
  `updateddate` datetime DEFAULT NULL,
  PRIMARY KEY (`uuid`),
  UNIQUE KEY `uuid_UNIQUE` (`uuid`)

CREATE TABLE `reddit_api`.`postvote` (
  `postuuid` VARCHAR(45) NOT NULL,
  `vote` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`postuuid`),
  CONSTRAINT `postuuid`
    FOREIGN KEY (`postuuid`)
    REFERENCES `reddit_api`.`post` (`uuid`)
   );

