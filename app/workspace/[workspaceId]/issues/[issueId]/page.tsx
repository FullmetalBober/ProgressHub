import EditIssue from '@/components/issues/EditIssue';
import prisma from '@/lib/db';
import type { Metadata } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const metadata: Metadata = {
  title: 'Issue',
};

export default async function IssuePage({ params }: { params: Params }) {
  const { workspaceId, issueId } = params;
  const identifier = Number(issueId);
  let issue;

  if (workspaceId && identifier)
    issue = await prisma.issue.findUnique({
      where: {
        identifier_workspaceId: {
          identifier,
          workspaceId,
        },
      },
    });

  if (!issue) return <div>Issue not found</div>;
  return (
    <div>
      <EditIssue issue={issue} />
    </div>
  );
}
