/*
  Warnings:

  - You are about to drop the column `previousContent` on the `GithubWikiFile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GithubWikiFile" DROP COLUMN "previousContent",
ADD COLUMN     "isModified" BOOLEAN NOT NULL DEFAULT false;
