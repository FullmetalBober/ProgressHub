'use server';

import { getUserAuth } from '@/lib/auth/utils';
import { db } from '@/lib/db/index';
import { WorkspaceCreateInputSchema } from '@/prisma/zod';
import { redirect } from 'next/navigation';
import { sanitizeFormData, setUserForm } from './utils';

export async function createWorkspace(formData: FormData) {
  await setUserForm(formData, 'ownerId');

  const data = sanitizeFormData(formData);

  const validatedFields = WorkspaceCreateInputSchema.safeParse(data);
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten());
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const workspace = await db.workspace.create({
    data: {
      ...validatedFields.data,
    },
  });

  redirect(`/${workspace.id}`);
}

export async function getWorkspaces() {
  const { session } = await getUserAuth();
  if (!session)
    return {
      errors: {
        auth: 'You must be logged in to create a workspace',
      },
    };

  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      Workspaces: true,
    },
  });

  return { workspaces: user?.Workspaces };
}
