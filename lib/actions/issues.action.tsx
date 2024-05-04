'use server';

import { IssueUncheckedCreateInputSchema } from '@/prisma/zod';
import { auth } from '../auth/utils';
import prisma from '../db';
import { sanitizeFormData } from './utils';

export async function createIssue(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error('You must be logged in to create an issue');

  const body = sanitizeFormData(formData);
  body.assigneeId = userId;

  const validatedFields = IssueUncheckedCreateInputSchema.safeParse(body);

  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );

  const { data } = validatedFields;

  const userRole = await prisma.workspaceMembers.findFirst({
    where: {
      workspaceId: data.workspaceId,
      userId,
    },
    select: {
      role: true,
    },
  });

  if (!userRole || (userRole.role !== 'ADMIN' && userRole.role !== 'OWNER'))
    throw new Error('You must be an admin to create an issue');

  return prisma.issue.create({
    data,
  });
}
