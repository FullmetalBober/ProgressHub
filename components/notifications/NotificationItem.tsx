'use client';

import { prioritiesIssue, statusesIssue } from '@/config/constants';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { formatDistanceLocale } from '@/lib/utils';
import { Issue, Notification, User } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import CustomAvatar from '../CustomAvatar';
import { Card, CardContent } from '../ui/card';

export default function NotificationItem({
  notification,
}: {
  notification: Notification & {
    issue: Pick<Issue, 'id' | 'title' | 'identifier' | 'status' | 'priority'>;
    sender: Pick<User, 'id' | 'name' | 'email' | 'image'>;
  };
}) {
  const [issue] = useSocketObserver('issue', [notification.issue]);

  const StatusIcon = statusesIssue.find(
    status => status.value === issue.status
  )?.icon;
  const PriorityIcon = prioritiesIssue.find(
    priority => priority.value === issue.priority
  )?.icon;

  return (
    <Card>
      <CardContent className='flex justify-between p-3'>
        <div className='flex gap-2 items-center flex-grow overflow-hidden'>
          <CustomAvatar
            src={notification.sender.image}
            name={notification.sender.name}
            className='w-10 h-10'
          />
          <div className='flex flex-col w-full overflow-hidden'>
            <span className='text-lg font-semibold truncate'>
              #{issue.identifier} {issue.title}
            </span>
            <span className='text-muted-foreground text-sm truncate'>
              {notification.sender.name} {notification.message}
            </span>
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <div className='flex gap-2'>
            {PriorityIcon && <PriorityIcon className='text-muted-foreground' />}
            {StatusIcon && (
              <div className='flex flex-col items-center'>
                <StatusIcon className='text-muted-foreground' />
                <span className='text-muted-foreground text-sm'>
                  {formatDistanceToNow(notification.updatedAt, {
                    addSuffix: false,
                    locale: {
                      formatDistance: (token, count) =>
                        formatDistanceLocale[token](count),
                    },
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
