'use client';

import { useSocketObserver } from '@/hooks/useSocketObserver';
import { Issue, Notification, User } from '@prisma/client';
import NotificationItem from './NotificationItem';

export default function NotificationList({
  notifications,
}: {
  notifications: (Notification & {
    issue: Pick<
      Issue,
      'id' | 'title' | 'identifier' | 'status' | 'priority'
    > | null;
    sender: Pick<User, 'id' | 'name' | 'email' | 'image'>;
  })[];
}) {
  const notificationsObserved = useSocketObserver(
    'notification',
    notifications
  );
  const notificationSorted = notificationsObserved.toSorted(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  return (
    <div className='flex flex-col gap-2'>
      {notificationSorted.map(notification => {
        if (notification.issue)
          return (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          );
      })}
    </div>
  );
}
