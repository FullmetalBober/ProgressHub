'use server';

import {
  CommentUncheckedCreateInputSchema,
  CommentUncheckedUpdateInputSchema,
} from '@/prisma/zod';
import prisma from '../db';
import { protectAction } from '../protection';
import { notifyUsers, zodValidate } from './utils';

export async function createComment(body: unknown) {
  const data = zodValidate(CommentUncheckedCreateInputSchema, body);
  const user = await protectAction({
    issueId: data.issueId,
  });

  const response = await prisma.comment.create({
    data: {
      ...data,
      authorId: user.id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  await notifyUsers(response.issueId, 'comment', 'create', response);

  return response;
}

export async function updateComment(id: string, body: unknown) {
  const data = zodValidate(CommentUncheckedUpdateInputSchema, body);
  const user = await protectAction();

  data.isEdited = true;
  const response = await prisma.comment.update({
    where: {
      id,
      authorId: user.id,
    },
    data: {
      ...data,
    },
  });

  await notifyUsers(response.issueId, 'comment', 'update', data, id);

  return response;
}

export async function deleteComment(id: string) {
  const user = await protectAction();

  const response = await prisma.comment.delete({
    where: {
      id,
      authorId: user.id,
    },
  });

  await notifyUsers(response.issueId, 'comment', 'delete', response);

  return response;
}

export async function createOrUpdateSystemComment(
  issueId: string,
  body: {
    main: string;
    sub?: string;
  },
  authorId?: string
) {
  const fullBody = body.main + (body.sub ? ` ${body.sub}` : '');
  const existingComment = await prisma.comment.findFirst({
    where: {
      issueId,
      authorId,
      body: {
        startsWith: body.main,
      },
      isSystem: true,
      updatedAt: {
        gte: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes
      },
    },
    select: {
      id: true,
    },
  });

  if (existingComment) {
    return updateSystemComment(existingComment.id, fullBody);
  } else {
    return createSystemComment(issueId, fullBody, authorId);
  }
}

export async function createSystemComment(
  issueId: string,
  body: string,
  authorId?: string
) {
  const response = await prisma.comment.create({
    data: {
      issueId,
      body,
      authorId,
      isSystem: true,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });
  await notifyUsers(issueId, 'comment', 'create', response);

  return response;
}

export async function updateSystemComment(id: string, body: string) {
  const response = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      body,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  await notifyUsers(response.issueId, 'comment', 'update', response);

  return response;
}
