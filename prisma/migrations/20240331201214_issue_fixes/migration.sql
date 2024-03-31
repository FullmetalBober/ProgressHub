/*
  Warnings:

  - You are about to drop the column `reporterId` on the `Issue` table. All the data in the column will be lost.
  - Made the column `description` on table `Issue` required. This step will fail if there are existing NULL values in that column.
  - Made the column `assigneeId` on table `Issue` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "reporterId",
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "assigneeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
