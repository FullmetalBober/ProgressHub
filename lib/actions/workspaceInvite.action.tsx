'use server';

import prisma from '@/lib/db/index';
import { WorkspaceInviteUncheckedCreateInputSchema } from '@/prisma/zod';
import { auth } from '../auth/utils';

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

  return prisma.workspaceInvite.create({
    data: {
      ...validatedFields.data,
      invitedById: userId,
    },
  });
}

export async function cancelWorkspaceInvite(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to cancel an invite');

  return prisma.workspaceInvite.delete({
    where: {
      id,
    },
  });
}
