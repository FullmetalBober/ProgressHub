/*
  Warnings:

  - A unique constraint covering the columns `[path,githubRepositoryId]` on the table `GithubWikiFile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GithubWikiFile_path_installationId_key";

-- CreateIndex
CREATE UNIQUE INDEX "GithubWikiFile_path_githubRepositoryId_key" ON "GithubWikiFile"("path", "githubRepositoryId");
