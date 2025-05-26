'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteWorkspace } from '@/lib/actions/workspaces.action';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function WorkspaceDelete({
  workspaceId,
}: Readonly<{
  workspaceId: string;
}>) {
  const router = useRouter();

  const onDeleteWorkspace = async () => {
    const action = deleteWorkspace(workspaceId);
    toast.promise(action, {
      loading: 'Видалення робочого простору...',
      success: 'Робочий простір видалено',
      error: 'Не вдалося видалити робочий простір',
    });
    await action;

    router.push('/workspace');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Видалити цей робочий простір</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Ви абсолютно впевнені?</AlertDialogTitle>
          <AlertDialogDescription>
            Цю дію неможливо скасувати. Це призведе до остаточного видалення
            вашої робочої області та видалення ваших даних з наших серверів.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Відмінити</AlertDialogCancel>
          <AlertDialogAction asChild onClick={onDeleteWorkspace}>
            <Button variant='destructive'>Продовжити</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
