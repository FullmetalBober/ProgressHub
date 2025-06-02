'use server';

import prisma from '@/lib/db/index';
import {
  WorkspaceCreateInputSchema,
  WorkspaceUpdateInputSchema,
} from '@/prisma/zod';
import { revalidatePath } from 'next/cache';
import { protectAction } from '../protection';
import { deleteImage, uploadImage } from '../store';
import { notifyUsers, revalidateCache, zodValidate } from './utils';

export async function createWorkspace(body: unknown) {
  const data = zodValidate(WorkspaceCreateInputSchema, body);
  const user = await protectAction();

  const response = await prisma.workspace.create({
    data: {
      ...data,
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });

  await notifyUsers(response.id, 'workspace', 'create', response);

  revalidateCache();
  return response;
}

export async function updateWorkspace(id: string, body: unknown) {
  const data = zodValidate(WorkspaceUpdateInputSchema, body);
  await protectAction(
    {
      workspaceId: id,
    },
    ['OWNER', 'ADMIN']
  );

  revalidatePath(`/workspace/${id}/settings`);
  const response = await prisma.workspace.update({
    where: {
      id,
    },
    data,
  });

  await notifyUsers(response.id, 'workspace', 'update', data, response.id);

  revalidateCache();
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

  revalidateCache();
  return response;
}

export async function updateWorkspaceImage(
  id: string,
  imageFormData: FormData
) {
  await protectAction(
    {
      workspaceId: id,
    },
    ['OWNER', 'ADMIN']
  );

  const file = imageFormData.get('image');
  if (!file) throw new Error('No file found');
  if (!(file instanceof File)) throw new Error('Invalid file type');

  const [workspace, image] = await Promise.all([
    prisma.workspace.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        image: true,
      },
    }),
    uploadImage(`workspace/${id}.webp`, file),
  ]);

  const [response] = await Promise.all([
    prisma.workspace.update({
      where: {
        id,
      },
      data: {
        image,
      },
    }),
    deleteImage(workspace.image),
  ]);

  revalidateCache();
  return response;
}
