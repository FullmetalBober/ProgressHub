'use server';

import prisma from '@/lib/db/index';
import { WorkspaceCreateInputSchema } from '@/prisma/zod';
import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { auth } from '../auth/utils';
import { notifyUsers } from './utils';

export async function createWorkspace(body: { [key: string]: unknown }) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to create an issue');

  const validatedFields = WorkspaceCreateInputSchema.safeParse(body);

  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );

  const response = await prisma.workspace.create({
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

  await notifyUsers(response.id, 'workspace', 'create', response);

  return response;
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
  const response = await prisma.workspace.update({
    where: {
      id,
    },
    data: validatedFields.data,
  });

  await notifyUsers(
    response.id,
    'workspace',
    'update',
    validatedFields.data,
    response.id
  );

  return response;
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
  const response = await prisma.workspace.delete({
    where: {
      id,
    },
  });

  await notifyUsers(response.id, 'workspace', 'delete', response);

  return response;
}
