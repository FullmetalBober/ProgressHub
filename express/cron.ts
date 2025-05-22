import prisma from '@/lib/db';
import { CronJob } from 'cron';

const NOTIFICATION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 3; // 3 days
const NOTIFICATION_TOO_MANY = 150;

const cleanReadNotifications = CronJob.from({
  cronTime: '0 */6 * * *', // Every 6 hours
  onTick: async () => {
    console.log('Cleaning read notifications');
    const notifications = await prisma.notification.findMany({
      select: {
        id: true,
      },
      where: {
        OR: [
          {
            isRead: true,
          },
          {
            isEmailSent: true,
          },
        ],
        updatedAt: {
          lte: new Date(Date.now() - NOTIFICATION_EXPIRATION_TIME),
        },
      },
    });

    const deleteIds = notifications.map(notification => notification.id);
    await prisma.notification.deleteMany({
      where: {
        id: {
          in: deleteIds,
        },
      },
    });
  },
  runOnInit: true,
});

const cleanTooManyNotifications = CronJob.from({
  cronTime: '0 */12 * * *', // Every 6 hours
  onTick: async () => {
    console.log('Cleaning too many notifications');
    let take = 500;
    let skip = 0;

    while (true) {
      const users = await prisma.user.findMany({
        select: {
          workspaces: {
            include: {
              workspace: {
                include: {
                  issues: {
                    include: {
                      notifications: {
                        select: {
                          id: true,
                          updatedAt: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        take,
        skip,
      });
      if (users.length === 0) break;

      const deleteIds = users.flatMap(user =>
        user.workspaces.flatMap(workspace => {
          const notifications = workspace.workspace.issues
            .flatMap(issue => issue.notifications)
            .sort((a, b) => a.updatedAt.getTime() - b.updatedAt.getTime())
            .map(notification => notification.id);

          const deleteCount = notifications.length - NOTIFICATION_TOO_MANY;

          if (deleteCount <= 0) return [];
          const deleteNotifications = notifications.slice(0, deleteCount);
          return deleteNotifications;
        })
      );

      await prisma.notification.deleteMany({
        where: {
          id: {
            in: deleteIds,
          },
        },
      });

      skip += take;
    }
  },
  runOnInit: true,
});

export default function startCronJobs() {
  cleanReadNotifications.start();
  cleanTooManyNotifications.start();
}
