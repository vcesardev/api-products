/*
  Warnings:

  - You are about to drop the column `productId` on the `component` table. All the data in the column will be lost.
  - Added the required column `productCode` to the `component` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `component` DROP FOREIGN KEY `component_productId_fkey`;

-- AlterTable
ALTER TABLE `component` DROP COLUMN `productId`,
    ADD COLUMN `productCode` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `component` ADD CONSTRAINT `component_productCode_fkey` FOREIGN KEY (`productCode`) REFERENCES `product`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
