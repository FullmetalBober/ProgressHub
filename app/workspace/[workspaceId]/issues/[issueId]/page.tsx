import EditIssue from '@/components/issues/EditIssue';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db';
import type { Metadata } from 'next';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

export const metadata: Metadata = {
  title: 'Issue',
};

export default async function IssuePage({ params }: { params: Params }) {
  const { workspaceId, issueId } = params;
  const identifier = Number(issueId);
  const session = await auth();
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

  if (!session?.user) return <div>Not authenticated</div>;
  if (!issue) return <div>Issue not found</div>;
  return (
    <div>
      <EditIssue issue={issue} user={session.user} />
    </div>
  );
}
