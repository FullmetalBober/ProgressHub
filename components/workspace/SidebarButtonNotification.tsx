'use client';

import { useSocketObserver } from '@/hooks/useSocketObserver';
import { Notification } from '@prisma/client';
import SidebarButton from '../layout/SidebarButton';

export default function SidebarButtonNotification({
  ...props
}: Readonly<{
  icon?: React.ReactNode;
  label: string;
  href: string;
  count?: number;
  notifications: Pick<Notification, 'id' | 'isRead'>[];
}>) {
  const notificationsObserved = useSocketObserver(
    'notification',
    props.notifications
  );
  const notificationFiltered = notificationsObserved.filter(
    notification => !notification.isRead
  );

  const notificationCount = notificationFiltered.length || undefined;

  return <SidebarButton {...props} badge={notificationCount} />;
}
