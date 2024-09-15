-- DropForeignKey
ALTER TABLE "Issue" DROP CONSTRAINT "Issue_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMembers" DROP CONSTRAINT "WorkspaceMembers_workspaceId_fkey";

-- AddForeignKey
ALTER TABLE "WorkspaceMembers" ADD CONSTRAINT "WorkspaceMembers_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Issue" ADD CONSTRAINT "Issue_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "Workspace"("id") ON DELETE CASCADE ON UPDATE CASCADE;
