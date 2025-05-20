'use server';

import { prioritiesIssue, statusesIssue } from '@/config/constants';
import {
  IssueUncheckedCreateInputSchema,
  IssueUncheckedUpdateInputSchema,
} from '@/prisma/zod';
import prisma from '../db';
import { protectAction } from '../protection';
import {
  createOrUpdateSystemComment,
  createSystemComment,
} from './comments.action';
import { upsertNotification } from './notifications.action';
import { notifyUsers, zodValidate } from './utils';

export async function createIssue(body: unknown) {
  const data = zodValidate(IssueUncheckedCreateInputSchema, body);
  const user = await protectAction({
    workspaceId: data.workspaceId,
  });

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: data.workspaceId,
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
        id: data.workspaceId,
      },
      data: {
        issueCount: {
          increment: 1,
        },
      },
    }),
  ]);

  createSystemComment(response.id, 'created the issue', user.id);

  await notifyUsers(response.workspaceId, 'issue', 'create', response);

  return response;
}

export async function updateIssue(id: string, body: unknown) {
  const user = await protectAction({
    issueId: id,
  });
  const data = zodValidate(IssueUncheckedUpdateInputSchema, body);

  const response = await prisma.issue.update({
    where: {
      id,
    },
    data,
    include: {
      assignee: true,
    },
  });

  if (data.assigneeId) {
    const sub = response.assignee.name;
    createOrUpdateSystemComment(
      id,
      {
        main: 'assigned the issue to',
        sub,
      },
      user.id
    );
    upsertNotification(id, response.assigneeId, user.id, {
      main: 'assigned you the issue',
      sub,
    });
  }
  if (data.status) {
    const sub = statusesIssue.find(s => s.value === data.status)?.label;
    createOrUpdateSystemComment(
      id,
      {
        main: 'changed the status to',
        sub,
      },
      user.id
    );
    upsertNotification(id, response.assigneeId, user.id, {
      main: 'changed the status to',
      sub,
    });
  }
  if (data.priority) {
    const sub = prioritiesIssue.find(s => s.value === data.priority)?.label;
    createOrUpdateSystemComment(
      id,
      {
        main: 'changed the priority to',
        sub,
      },
      user.id
    );
    upsertNotification(id, response.assigneeId, user.id, {
      main: 'changed the priority to',
      sub,
    });
  }
  if (data.title) {
    createOrUpdateSystemComment(
      id,
      {
        main: 'changed the title to',
        sub: String(data.title),
      },
      user.id
    );
    upsertNotification(id, response.assigneeId, user.id, {
      main: 'changed the title to',
      sub: String(data.title),
    });
  }

  const notifyData = {
    ...data,
    ...(data.assigneeId && { assignee: response.assignee }),
  };

  await notifyUsers(response.workspaceId, 'issue', 'update', notifyData, id);

  return response;
}
