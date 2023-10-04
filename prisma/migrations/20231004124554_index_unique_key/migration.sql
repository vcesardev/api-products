/*
  Warnings:

  - A unique constraint covering the columns `[index]` on the table `component` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `component_index_key` ON `component`(`index`);
