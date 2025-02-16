'use server';

import InviteWorkspaceEmail from '@/components/emails/InviteWorkspaceEmail';
import prisma from '@/lib/db/index';
import { WorkspaceInviteUncheckedCreateInputSchema } from '@/prisma/zod';
import { auth } from '../auth/utils';
import { sendEmail } from '../email';
import { notifyUsers } from './utils';

export async function inviteUserToWorkspace(body: { [key: string]: unknown }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to create an issue');

  const validatedFields =
    WorkspaceInviteUncheckedCreateInputSchema.safeParse(body);

  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );

  const response = await prisma.workspaceInvite.create({
    data: {
      ...validatedFields.data,
      invitedById: userId,
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

  return response;
}

export async function cancelWorkspaceInvite(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to cancel an invite');

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

  return response;
}
