/*
  Warnings:

  - The `priority` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `WorkspaceInvite` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `WorkspaceMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "WorkspaceRole" AS ENUM ('OWNER', 'ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "WorkspaceInviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- CreateEnum
CREATE TYPE "IssueStatus" AS ENUM ('BACKLOG', 'TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE', 'CANCELED');

-- CreateEnum
CREATE TYPE "IssuePriority" AS ENUM ('NO_PRIORITY', 'URGENT', 'HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "priority",
ADD COLUMN     "priority" "IssuePriority" NOT NULL DEFAULT 'NO_PRIORITY',
DROP COLUMN "status",
ADD COLUMN     "status" "IssueStatus" NOT NULL DEFAULT 'BACKLOG';

-- AlterTable
ALTER TABLE "WorkspaceInvite" DROP COLUMN "status",
ADD COLUMN     "status" "WorkspaceInviteStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP COLUMN "role",
ADD COLUMN     "role" "WorkspaceRole" NOT NULL DEFAULT 'MEMBER';

-- DropEnum
DROP TYPE "InviteStatus";

-- DropEnum
DROP TYPE "Priority";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "Status";
