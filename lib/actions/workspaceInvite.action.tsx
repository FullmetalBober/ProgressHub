'use server';

import InviteWorkspaceEmail from '@/components/emails/InviteWorkspaceEmail';
import prisma from '@/lib/db/index';
import { WorkspaceInviteUncheckedCreateInputSchema } from '@/prisma/zod';
import { sendEmail } from '../email';
import { protectAction } from '../protection';
import { notifyUsers, revalidateCache, zodValidate } from './utils';

export async function inviteUserToWorkspace(body: unknown) {
  const data = zodValidate(WorkspaceInviteUncheckedCreateInputSchema, body);
  const user = await protectAction(
    {
      workspaceId: data.workspaceId,
    },
    ['OWNER', 'ADMIN']
  );

  const response = await prisma.workspaceInvite.create({
    data: {
      ...data,
      invitedById: user.id,
    },
    include: {
      workspace: true,
    },
  });

  await Promise.all([
    notifyUsers(response.workspaceId, 'workspaceInvite', 'create', response),
    sendEmail(
      response.email,
      'Hello, you have been invited to a workspace!',
      InviteWorkspaceEmail({
        workspaceName: response.workspace.name,
      })
    ),
  ]);

  revalidateCache();
  return response;
}

export async function cancelWorkspaceInvite(id: string) {
  await protectAction(
    {
      workspaceInviteId: id,
    },
    ['OWNER', 'ADMIN']
  );

  const response = await prisma.workspaceInvite.delete({
    where: {
      id,
    },
  });

  await notifyUsers(
    response.workspaceId,
    'workspaceInvite',
    'delete',
    response
  );

  revalidateCache();
  return response;
}

export async function acceptWorkspaceInvite(id: string) {
  const user = await protectAction();

  const invite = await prisma.workspaceInvite.findUnique({
    where: {
      id,
    },
  });
  if (!invite) throw new Error('Invite not found');
  if (invite.email !== user.email)
    throw new Error('You are not the user for this invite');

  const [workspaceMember] = await prisma.$transaction([
    prisma.workspaceMember.create({
      data: {
        userId: user.id,
        workspaceId: invite.workspaceId,
      },
    }),
    prisma.workspaceInvite.delete({
      where: {
        id,
      },
    }),
  ]);

  revalidateCache();
  return workspaceMember;
}
