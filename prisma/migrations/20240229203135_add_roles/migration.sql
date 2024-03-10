/*
  Warnings:

  - Added the required column `role` to the `WorkspaceMembers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "WorkspaceMembers" ADD COLUMN     "role" "Role" NOT NULL;
