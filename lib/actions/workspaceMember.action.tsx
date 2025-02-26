'use server';

import prisma from '@/lib/db/index';
import { WorkspaceMemberUncheckedUpdateInputSchema } from '@/prisma/zod';
import { protectAction } from '../protection';
import { zodValidate } from './utils';

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
