/*
  Warnings:

  - The primary key for the `GithubAppInstallation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `installationId` on the `GithubAppInstallation` table. All the data in the column will be lost.
  - Changed the type of `id` on the `GithubAppInstallation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "GithubAppInstallation_installationId_key";

-- AlterTable
ALTER TABLE "GithubAppInstallation" DROP CONSTRAINT "GithubAppInstallation_pkey",
DROP COLUMN "installationId",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "GithubAppInstallation_pkey" PRIMARY KEY ("id");
