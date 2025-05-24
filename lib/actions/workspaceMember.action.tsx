'use server';

import prisma from '@/lib/db/index';
import { WorkspaceMemberUncheckedUpdateInputSchema } from '@/prisma/zod';
import { protectAction } from '../protection';
import { notifyUsers, zodValidate } from './utils';

export async function updateWorkspaceMember(id: string, body: unknown) {
  const data = zodValidate(WorkspaceMemberUncheckedUpdateInputSchema, body);
  await protectAction(
    {
      workspaceMemberId: id,
    },
    ['OWNER', 'ADMIN']
  );

  if (data.role === 'OWNER') {
    throw new Error('Cannot update role to OWNER');
  }

  const response = await prisma.workspaceMember.update({
    where: {
      id,
    },
    data,
  });

  return response;
}

export async function deleteWorkspaceMember(id: string) {
  const { id: userId } = await protectAction(
    {
      workspaceMemberId: id,
    },
    ['OWNER', 'ADMIN']
  );

  const response = await prisma.workspaceMember.delete({
    where: {
      id,
      role: {
        not: 'OWNER',
      },
      userId: {
        not: userId,
      },
    },
  });

  await notifyUsers(
    response.workspaceId,
    'workspaceMember',
    'delete',
    response
  );

  return response;
}

export async function leaveWorkspace(workspaceId: string) {
  const { id: userId } = await protectAction(
    {
      workspaceId,
    },
    ['ADMIN', 'MEMBER']
  );

  const response = await prisma.workspaceMember.delete({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
  });

  await notifyUsers(workspaceId, 'workspaceMember', 'delete', response);

  return response;
}
