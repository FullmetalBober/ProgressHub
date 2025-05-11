/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `GithubWikiFile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[path,installationId]` on the table `GithubWikiFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `installationId` to the `GithubWikiFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GithubWikiFile" DROP CONSTRAINT "GithubWikiFile_workspaceId_fkey";

-- DropIndex
DROP INDEX "GithubWikiFile_path_workspaceId_key";

-- AlterTable
ALTER TABLE "GithubWikiFile" DROP COLUMN "workspaceId",
ADD COLUMN     "installationId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GithubWikiFile_path_installationId_key" ON "GithubWikiFile"("path", "installationId");

-- AddForeignKey
ALTER TABLE "GithubWikiFile" ADD CONSTRAINT "GithubWikiFile_installationId_fkey" FOREIGN KEY ("installationId") REFERENCES "GithubAppInstallation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
