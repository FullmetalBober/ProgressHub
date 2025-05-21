'use client';

import { useSocketObserver } from '@/hooks/useSocketObserver';
import { markAllNotificationsAsRead } from '@/lib/actions/notifications.action';
import { Issue, Notification, User } from '@prisma/client';
import { useState } from 'react';
import { Button } from '../ui/button';
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
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
  const notificationsObserved = useSocketObserver(
    'notification',
    notifications
  );
  const notificationSorted = notificationsObserved.toSorted(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
  );

  const handleMarkAllAsRead = async () => {
    setIsMarkingAsRead(true);

    await markAllNotificationsAsRead();

    setIsMarkingAsRead(false);
  };

  const markAllAsReadButtonDisabled =
    notificationSorted.length === 0 ||
    notificationSorted.every(notification => notification.isRead) ||
    isMarkingAsRead;
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Notifications</h1>
        <Button
          variant='outline'
          size='sm'
          onClick={handleMarkAllAsRead}
          disabled={markAllAsReadButtonDisabled}
        >
          Mark all as read
        </Button>
      </div>
      <div className='flex flex-col gap-2'>
        {notificationSorted.map(notification => {
          if (notification.issue !== null)
            return (
              <NotificationItem
                key={notification.id}
                notification={{ ...notification, issue: notification.issue }}
              />
            );
        })}
      </div>
    </div>
  );
}
