'use server';

import prisma from '@/lib/db/index';
import { WorkspaceCreateInputSchema } from '@/prisma/zod';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth/utils';

export async function createWorkspace(body: { [key: string]: unknown }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to create an issue');

  const validatedFields = WorkspaceCreateInputSchema.safeParse(body);

  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );

  return prisma.workspace.create({
    data: {
      ...validatedFields.data,
      members: {
        create: {
          userId: userId,
          role: 'OWNER',
        },
      },
    },
  });
}

export async function updateWorkspace(
  id: string,
  body: { [key: string]: unknown }
) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to update a workspace');

  const validatedFields = WorkspaceCreateInputSchema.safeParse(body);

  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );

  revalidatePath(`/workspace/${id}/settings`);
  return prisma.workspace.update({
    where: {
      id,
    },
    data: validatedFields.data,
  });
}

export async function getWorkspaces(opt?: Prisma.User$workspacesArgs) {
  const session = await auth();

  if (!session)
    return {
      errors: {
        auth: 'You must be logged in to get a workspace',
      },
    };

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      workspaces: opt || true,
    },
  });

  return { workspaces: user?.workspaces };
}

export async function deleteWorkspace(id: string) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to delete a workspace');

  revalidatePath('/workspace');
  return prisma.workspace.delete({
    where: {
      id,
    },
  });
}
