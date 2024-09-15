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
import { useToast } from '../ui/use-toast';

export default function WorkspaceDelete({
  workspaceId,
}: Readonly<{
  workspaceId: string;
}>) {
  const router = useRouter();
  const { toast } = useToast();

  const onDeleteWorkspace = async () => {
    await deleteWorkspace(workspaceId);

    toast({
      title: 'Workspace deleted successfully!',
    });
    router.push('/workspace');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Delete this workspace</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            workspace and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild onClick={onDeleteWorkspace}>
            <Button variant='destructive'>Continue</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
