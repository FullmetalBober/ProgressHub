/*
  Warnings:

  - You are about to drop the column `imageKey` on the `Workspace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "imageKey",
ADD COLUMN     "image" TEXT;
