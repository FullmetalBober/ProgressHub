-- AlterTable
ALTER TABLE "GithubWikiFile" ADD COLUMN     "previousContent" BYTEA,
ADD COLUMN     "previousPath" TEXT;
