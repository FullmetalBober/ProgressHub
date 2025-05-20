import NotificationList from '@/components/notifications/NotificationList';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db';

export default async function NotificationsPage(
  props: Readonly<{
    params: Promise<{
      workspaceId: string;
    }>;
  }>
) {
  const params = await props.params;
  const { workspaceId } = params;
  const session = await auth();
  if (!session?.user) return <div>Not authenticated</div>;

  const notifications = await prisma.notification.findMany({
    where: {
      recipientId: session.user.id,
      issue: {
        workspaceId,
      },
    },
    include: {
      issue: {
        select: {
          id: true,
          title: true,
          identifier: true,
          status: true,
          priority: true,
        },
      },
      sender: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'asc',
    },
  });

  return <NotificationList notifications={notifications} />;
}
