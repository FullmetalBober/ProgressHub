'use server';

import { Prisma } from '@prisma/client';
import prisma from '../db';
import { notifyUsers } from './utils';

// Should be used only in the server

const notificationInclude = {
  issue: {
    select: {
      id: true,
      title: true,
      identifier: true,
      status: true,
      priority: true,
      workspace: {
        select: {
          id: true,
        },
      },
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
};

export async function createNotification(
  body: Prisma.NotificationUncheckedCreateInput
) {
  const response = await prisma.notification.create({
    data: body,
    include: notificationInclude,
  });

  await notifyUsers(
    `${response.recipientId}-${response.issue?.workspace.id}`,
    'notification',
    'create',
    response
  );

  return response;
}

export async function updateNotification(
  id: string,
  body: Prisma.NotificationUncheckedUpdateInput
) {
  const response = await prisma.notification.update({
    where: {
      id,
    },
    data: body,
    include: notificationInclude,
  });

  await notifyUsers(
    `${response.recipientId}-${response.issue?.workspace.id}`,
    'notification',
    'update',
    {
      id: response.id,
      issue: response.issue,
      ...body,
    }
  );

  return response;
}

export async function deleteNotification(id: string) {
  const response = await prisma.notification.delete({
    where: {
      id,
    },
    include: notificationInclude,
  });

  await notifyUsers(
    `${response.recipientId}-${response.issue?.workspace.id}`,
    'notification',
    'delete',
    {
      id: response.id,
    }
  );

  return response;
}

export async function upsertNotification(
  issueId: string,
  recipientId: string,
  senderId: string,
  message: {
    main: string;
    sub?: string;
  }
) {
  if (recipientId === senderId) return;
  const fullMessage = message.main + (message.sub ? ` ${message.sub}` : '');
  let notification = await prisma.notification.findFirst({
    where: {
      issueId,
      message: {
        startsWith: message.main,
      },
      isRead: false,
      isEmailSent: false,
      updatedAt: {
        gte: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes
      },
    },
    select: {
      id: true,
      recipientId: true,
    },
  });

  if (notification && notification.recipientId !== recipientId) {
    await deleteNotification(notification.id);
    notification = null;
  }

  if (notification) {
    return updateNotification(notification.id, {
      recipientId,
      senderId,
      message: fullMessage,
    });
  } else {
    return createNotification({
      issueId,
      recipientId,
      senderId,
      message: fullMessage,
    });
  }
}
