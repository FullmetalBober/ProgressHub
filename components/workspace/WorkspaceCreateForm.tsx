'use client';

import { useToast } from '@/components/ui/use-toast';
import { createWorkspace } from '@/lib/actions/workspaces.action';
import { useRouter } from 'next/navigation';
import WorkspaceForm from './WorkspaceForm';

export default function WorkspaceCreateForm() {
  const router = useRouter();
  const { toast } = useToast();

  //! Prisma.WorkspaceUncheckedCreateInput
  async function onSubmit(data: any) {
    try {
      const res = await createWorkspace(data);

      toast({
        title: 'Workspace created successfully!',
      });
      router.push(`/workspace/${res.id}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem with your request. Please try again later.',
      });
    }
  }

  return <WorkspaceForm submitHandler={onSubmit} />;
}
