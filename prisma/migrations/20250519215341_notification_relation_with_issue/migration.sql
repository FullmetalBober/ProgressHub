/*
  Warnings:

  - You are about to drop the column `link` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "link",
ADD COLUMN     "isEmailSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "issueId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
