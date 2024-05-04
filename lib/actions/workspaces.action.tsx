'use server';

import prisma from '@/lib/db/index';
import { WorkspaceCreateInputSchema } from '@/prisma/zod';
import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';
import { auth } from '../auth/utils';
import { sanitizeFormData } from './utils';

export async function createWorkspace(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      errors: {
        auth: 'You must be logged in to create a workspace',
      },
    };
  }

  const data = sanitizeFormData(formData);

  const validatedFields = WorkspaceCreateInputSchema.safeParse(data);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const workspace = await prisma.workspace.create({
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

  redirect(`/${workspace.id}`);
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
