'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createWorkspace } from '@/lib/actions/workspaces.action';
import { WorkspaceUncheckedCreateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Workspace } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function WorkspaceCreateForm() {
  const router = useRouter();
  const form = useForm<Workspace>({
    resolver: zodResolver(WorkspaceUncheckedCreateInputSchema),
    defaultValues: {
      name: '',
    },
  });

  async function submitHandler(data: Workspace) {
    const action = createWorkspace(data);
    toast.promise(action, {
      loading: 'Creating workspace...',
      success: 'Workspace created successfully',
      error: 'Failed to create workspace',
    });
    const res = await action;

    router.push(`/workspace/${res.id}`);
  }

  const isFormDisabled = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className='grid gap-3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Enter workspace name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isFormDisabled} className='w-full'>
          Create workspace
        </Button>
      </form>
    </Form>
  );
}
