-- Loome replybot andmebaasi:
CREATE SCHEMA `replybot` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Loome messages tabeli:
CREATE TABLE `replybot`.`messages` (
  `id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));


-- Lisame messages tabelisse Auto Increment Primary Key:
ALTER TABLE `replybot`.`messages`
CHANGE COLUMN `id` `id` INT NOT NULL AUTO_INCREMENT ;