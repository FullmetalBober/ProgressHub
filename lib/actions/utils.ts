import { ZodType } from 'zod';
import { auth } from '../auth/utils';
import { env } from '../env.mjs';

export async function setUserForm(formData: FormData, field: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  formData.append(field, session.user.id);
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
