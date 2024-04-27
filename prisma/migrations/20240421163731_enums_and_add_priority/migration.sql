/*
  Warnings:

  - The `status` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BACKLOG', 'TODO', 'IN_PROGRESS', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('NO_PRIORITY', 'URGENT', 'HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "Issue" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'NO_PRIORITY',
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'BACKLOG';
