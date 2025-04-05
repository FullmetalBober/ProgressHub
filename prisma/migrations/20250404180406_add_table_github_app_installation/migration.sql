/*
  Warnings:

  - You are about to drop the column `githubInstallationId` on the `Workspace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workspace" DROP COLUMN "githubInstallationId";

-- CreateTable
CREATE TABLE "GithubAppInstallation" (
    "id" TEXT NOT NULL,
    "installationId" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubAppInstallation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubAppInstallation_installationId_key" ON "GithubAppInstallation"("installationId");

-- AddForeignKey
ALTER TABLE "GithubAppInstallation" ADD CONSTRAINT "GithubAppInstallation_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubAppInstallation" ADD CONSTRAINT "GithubAppInstallation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
