import CommentsSection from '@/components/comments/CommentsSection';
import EditIssue from '@/components/issues/EditIssue';
import { Separator } from '@/components/ui/separator';
import { markAllNotificationsAsReadByIssue } from '@/lib/actions/notifications.action';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Завдання',
};

export default async function IssuePage(
  props: Readonly<{ params: Promise<{ workspaceId: string; issueId: string }> }>
) {
  const params = await props.params;
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
      include: {
        workspace: {
          include: {
            members: {
              select: {
                user: true,
              },
            },
          },
        },
        comments: {
          include: {
            author: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

  if (!session?.user) return <div>Not authenticated</div>;
  if (!issue) return <div>Issue not found</div>;

  await markAllNotificationsAsReadByIssue(issue.id);

  const workspaceUsers = issue.workspace.members.map(m => m.user);

  return (
    <div>
      <EditIssue issue={issue} user={session.user} users={workspaceUsers} />
      <Separator className='my-4' />
      <CommentsSection
        issueId={issue.id}
        user={session.user}
        comments={issue.comments}
      />
    </div>
  );
}
