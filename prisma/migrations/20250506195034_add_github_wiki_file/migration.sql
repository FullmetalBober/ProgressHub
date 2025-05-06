-- CreateTable
CREATE TABLE "GithubWikiFile" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "workspaceId" TEXT NOT NULL,
    "githubRepositoryId" INTEGER NOT NULL,
    "content" BYTEA,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GithubWikiFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubWikiFile_path_workspaceId_key" ON "GithubWikiFile"("path", "workspaceId");

-- AddForeignKey
ALTER TABLE "GithubWikiFile" ADD CONSTRAINT "GithubWikiFile_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
