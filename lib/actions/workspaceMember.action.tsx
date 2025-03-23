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
    ['OWNER']
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

export async function deleteWorkspaceMemberAsOwner(id: string) {
  const { id: userId } = await protectAction(
    {
      workspaceMemberId: id,
    },
    ['OWNER']
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

export async function deleteWorkspaceMemberAsAdmin(id: string) {
  const { id: userId } = await protectAction(
    {
      workspaceMemberId: id,
    },
    ['ADMIN']
  );

  const response = await prisma.workspaceMember.delete({
    where: {
      id,
      role: 'MEMBER',
      userId: {
        not: userId,
      },
    },
  });

  return response;
}

export async function transferWorkspaceOwnership(id: string) {
  await protectAction(
    {
      workspaceMemberId: id,
    },
    ['OWNER']
  );

  const currentOwner = await prisma.workspaceMember.findFirstOrThrow({
    where: {
      role: 'OWNER',
      workspace: {
        members: {
          some: {
            id,
          },
        },
      },
    },
    select: {
      id: true,
    },
  });

  const response = await prisma.$transaction([
    prisma.workspaceMember.update({
      where: {
        id: currentOwner.id,
      },
      data: {
        role: 'ADMIN',
      },
    }),
    prisma.workspaceMember.update({
      where: {
        id,
      },
      data: {
        role: 'OWNER',
      },
    }),
  ]);

  return response;
}
