'use server';

import {
  IssueUncheckedCreateInputSchema,
  IssueUncheckedUpdateInputSchema,
} from '@/prisma/zod';
import prisma from '../db';
import { protectAction } from '../protection';
import { notifyUsers } from './utils';

export async function createIssue(body: { [key: string]: unknown }) {
  const validatedFields = IssueUncheckedCreateInputSchema.safeParse(body);
  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );
  const { data } = validatedFields;

  const { workspaceId } = data;

  const user = await protectAction({
    workspaceId,
  });

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    select: {
      members: {
        where: {
          userId: user.id,
        },
        select: {
          role: true,
        },
      },
      issueCount: true,
    },
  });
  if (!workspace) throw new Error('Workspace not found');

  data.identifier = workspace.issueCount + 1;

  const [response] = await prisma.$transaction([
    prisma.issue.create({
      data,
      include: {
        assignee: true,
      },
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
  await protectAction({
    issueId: id,
  });

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
    include: {
      assignee: true,
    },
  });

  const notifyData = {
    ...validatedFields.data,
    ...(validatedFields.data.assigneeId && { assignee: response.assignee }),
  };

  await notifyUsers(response.workspaceId, 'issue', 'update', notifyData, id);

  return response;
}
