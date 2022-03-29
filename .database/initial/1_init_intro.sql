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
  `idpostvote` VARCHAR(45) NOT NULL,
  `iduservote` VARCHAR(45) NOT NULL,
  `vote` BOOLEAN NOT NULL,
  PRIMARY KEY (`idpostvote`, `iduservote`),
  INDEX `useruuid_idx` (`iduservote` ASC) VISIBLE,
  CONSTRAINT `postuuid`
    FOREIGN KEY (`idpostvote`)
    REFERENCES `reddit_api`.`post` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `useruuid`
    FOREIGN KEY (`iduservote`)
    REFERENCES `reddit_api`.`users` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

  CREATE TABLE `reddit_api`.`postcomment` (
  `idpostvote` VARCHAR(45) NOT NULL,
  `iduservote` VARCHAR(45) NOT NULL,
  `postcomment` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`idpostvote`, `iduservote`),
  INDEX `useruuid_idx` (`iduservote` ASC) VISIBLE,
  CONSTRAINT `postuserid`
    FOREIGN KEY (`idpostvote`)
    REFERENCES `reddit_api`.`post` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `useruuid`
    FOREIGN KEY (`iduservote`)
    REFERENCES `reddit_api`.`users` (`uuid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `reddit_api`.`postcomment` 
ADD COLUMN `uuid` VARCHAR(45) NOT NULL AFTER `postcomment`,
DROP PRIMARY KEY,
ADD PRIMARY KEY (`idpostvote`, `iduservote`, `uuid`),
ADD UNIQUE INDEX `uuid_UNIQUE` (`uuid` ASC) VISIBLE;
;


ALTER TABLE `reddit_api`.`postcomment` 
CHANGE COLUMN `idpostvote` `idpostcomment` VARCHAR(45) NOT NULL ,
CHANGE COLUMN `iduservote` `idusercomment` VARCHAR(45) NOT NULL ;

