/*
  Warnings:

  - A unique constraint covering the columns `[email,workspaceId]` on the table `WorkspaceInvite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceInvite_email_workspaceId_key" ON "WorkspaceInvite"("email", "workspaceId");
