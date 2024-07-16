import { auth } from '../auth/utils';

export async function setUserForm(formData: FormData, field: string) {
  const session = await auth();
  if (!session?.user?.id) return;

  formData.append(field, session.user.id);
}
