/*
  Warnings:

  - The primary key for the `Issue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[identifier,workspaceId]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_issueId_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "issueId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_pkey",
ADD COLUMN     "identifier" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Issue_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Issue_id_seq";

-- AlterTable
ALTER TABLE "Workspace" ADD COLUMN     "issueCount" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Issue_identifier_workspaceId_key" ON "Issue"("identifier", "workspaceId");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
