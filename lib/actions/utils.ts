import { revalidatePath } from 'next/cache';
import { ZodType } from 'zod';
import { env } from '../env.mjs';

const pageEndpoints = [
  '/(workspace)/join',
  '/workspace/[workspaceId]/settings/general',
  '/workspace/[workspaceId]/settings/members',
  '/workspace/[workspaceId]/settings/profile',
  '/workspace/[workspaceId]/(mainWorkspacePages)/issues',
  '/workspace/[workspaceId]/(mainWorkspacePages)/issues/[issueId]',
  '/workspace/[workspaceId]/(mainWorkspacePages)/notifications',
  '/workspace/[workspaceId]/(mainWorkspacePages)/wikis',
  '/workspace/[workspaceId]/(mainWorkspacePages)/wikis/[installationId]/[repositoryId]',
];
const layoutEndpoints = ['/workspace/[workspaceId]'];
export function revalidateCache() {
  pageEndpoints.forEach(endpoint => {
    revalidatePath(endpoint, 'page');
  });
  layoutEndpoints.forEach(endpoint => {
    revalidatePath(endpoint, 'layout');
  });
}

export function notifyUsers(
  room: string,
  entity: string,
  event: string,
  payload: Record<string, unknown>,
  entityId?: string
) {
  return fetch(`${env.SOCKET_BASE_URL}/api/notify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      room,
      entity,
      event,
      payload: {
        id: entityId,
        ...payload,
      },
    }),
  });
}

export function zodValidate<T>(schema: ZodType<T>, data: unknown) {
  const validatedFields = schema.safeParse(data);
  if (!validatedFields.success)
    throw new Error(
      validatedFields.error.errors.map(e => e.message).join(', ')
    );
  const { data: validatedDate } = validatedFields;

  return validatedDate;
}
