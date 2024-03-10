import { auth } from '../auth/utils';

export async function setUserForm(formData: FormData, field: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  formData.append(field, session.user.id);
}

export function sanitizeFormData(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  for (const key in data) {
    if (data[key] === '' || key.includes('$ACTION_ID_')) delete data[key];
  }

  return data;
}
