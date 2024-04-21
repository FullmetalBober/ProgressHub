'use server';

import { IssueUncheckedCreateInputSchema } from '@/prisma/zod';
import { auth } from '../auth/utils';
import { sanitizeFormData } from './utils';

export async function createIssue(formData: FormData) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return {
      errors: {
        auth: 'You must be logged in to create a workspace',
      },
    };
  }

  const body = sanitizeFormData(formData);
  body.assigneeId = userId;

  const validatedFields = IssueUncheckedCreateInputSchema.safeParse(body);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { data } = validatedFields;

  const userRole = await prisma?.workspaceMembers.findFirst({
    where: {
      workspaceId: data.workspaceId,
      userId,
    },
    select: {
      role: true,
    },
  });

  if (!userRole || userRole.role !== 'ADMIN') {
    return {
      errors: {
        auth: 'You must be an admin to create an issue',
      },
    };
  }

  return prisma?.issue.create({
    data,
  });
}
