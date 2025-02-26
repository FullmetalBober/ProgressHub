'use server';

import prisma from '@/lib/db/index';
import { WorkspaceCreateInputSchema } from '@/prisma/zod';
import { revalidatePath } from 'next/cache';
import { protectAction } from '../protection';
import { notifyUsers } from './utils';

export async function createWorkspace(body: { [key: string]: unknown }) {
  const user = await protectAction();

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
          userId: user.id,
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
  await protectAction(
    {
      workspaceId: id,
    },
    ['OWNER', 'ADMIN']
  );
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

export async function deleteWorkspace(id: string) {
  await protectAction(
    {
      workspaceId: id,
    },
    ['OWNER']
  );

  revalidatePath('/workspace');
  const response = await prisma.workspace.delete({
    where: {
      id,
    },
  });

  await notifyUsers(response.id, 'workspace', 'delete', response);

  return response;
}
