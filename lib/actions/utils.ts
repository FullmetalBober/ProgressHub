import { z, ZodType } from 'zod';
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

const githubWikiSchema = z.array(
  z.object({
    name: z.string(),
    content: z.string(),
  })
);

export async function getGithubWikis(installationId: number, repoId: number) {
  const res = await fetch(
    `${env.SOCKET_BASE_URL}/github/wiki/${installationId}/${repoId}`
  );
  if (!res.ok) throw new Error('Failed to fetch wikis');
  const data = await res.json();

  const parsedData = githubWikiSchema.parse(data);
  return parsedData;
}

export async function pushMdFile(
  installationId: number,
  repoId: number,
  fileName: string,
  { oldFileName, content }: { oldFileName?: string | null; content?: string }
) {
  const res = await fetch(
    `${env.SOCKET_BASE_URL}/api/github/wiki/${installationId}/${repoId}/file`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fileName,
        oldName: oldFileName,
        content,
      }),
    }
  );
  if (!res.ok) throw new Error('Failed to create wiki file');
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
