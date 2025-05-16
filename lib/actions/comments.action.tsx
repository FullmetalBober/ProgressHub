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
