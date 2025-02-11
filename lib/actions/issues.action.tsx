'use server';

import {
  IssueUncheckedCreateInputSchema,
  IssueUncheckedUpdateInputSchema,
} from '@/prisma/zod';
import { auth } from '../auth/utils';
import prisma from '../db';
import { notifyUsers } from './utils';

export async function createIssue(body: { [key: string]: unknown }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to create an issue');

  body.assigneeId = userId;

  const validatedFields = IssueUncheckedCreateInputSchema.safeParse(body);

  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );

  const { data } = validatedFields;

  const { workspaceId } = data;

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    select: {
      members: {
        where: {
          userId,
        },
        select: {
          role: true,
        },
      },
      issueCount: true,
    },
  });

  const userRole = workspace?.members[0];

  if (!userRole || (userRole.role !== 'ADMIN' && userRole.role !== 'OWNER'))
    throw new Error('You must be an admin to create an issue');

  data.identifier = workspace.issueCount + 1;

  const [response] = await prisma.$transaction([
    prisma.issue.create({
      data,
    }),
    prisma.workspace.update({
      where: {
        id: workspaceId,
      },
      data: {
        issueCount: {
          increment: 1,
        },
      },
    }),
  ]);

  await notifyUsers(response.workspaceId, 'issue', 'create', response);

  return response;
}

export async function updateIssue(
  id: string,
  body: { [key: string]: unknown }
) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to update a workspace');

  const validatedFields = IssueUncheckedUpdateInputSchema.safeParse(body);

  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );

  const response = await prisma.issue.update({
    where: {
      id,
    },
    data: validatedFields.data,
  });

  await notifyUsers(
    response.workspaceId,
    'issue',
    'update',
    validatedFields.data,
    response.id
  );

  return response;
}
