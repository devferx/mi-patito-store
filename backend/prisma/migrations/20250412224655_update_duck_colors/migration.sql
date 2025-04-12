/*
  Warnings:

  - The values [Blue] on the enum `Duck_color` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Duck` MODIFY `color` ENUM('Red', 'Green', 'Yellow', 'Black') NOT NULL;
