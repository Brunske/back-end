/*
  Warnings:

  - You are about to drop the column `maxScore` on the `level` table. All the data in the column will be lost.
  - You are about to alter the column `difficulty` on the `level` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `category` on the `level` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - The primary key for the `userlevel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `userlevel` table. All the data in the column will be lost.
  - Added the required column `Score` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelData` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelSequence` to the `Level` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `level` DROP COLUMN `maxScore`,
    ADD COLUMN `Score` INTEGER NOT NULL,
    ADD COLUMN `levelData` JSON NOT NULL,
    ADD COLUMN `levelSequence` INTEGER NOT NULL,
    ADD COLUMN `type` ENUM('BASIC', 'REGULAR', 'CHALLENGE') NOT NULL,
    MODIFY `difficulty` ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL,
    MODIFY `category` ENUM('BASIC', 'COMPLEX') NOT NULL,
    MODIFY `optionsLimit` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `currentLevel` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `userlevel` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`userId`, `levelId`);
