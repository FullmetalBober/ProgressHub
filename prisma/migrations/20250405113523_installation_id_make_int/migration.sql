/*
  Warnings:

  - Changed the type of `installationId` on the `GithubAppInstallation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GithubAppInstallation" DROP COLUMN "installationId",
ADD COLUMN     "installationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GithubAppInstallation_installationId_key" ON "GithubAppInstallation"("installationId");
