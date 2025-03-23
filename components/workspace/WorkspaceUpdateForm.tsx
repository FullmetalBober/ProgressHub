'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateWorkspace } from '@/lib/actions/workspaces.action';
import {
  WorkspacePartial,
  WorkspaceUncheckedCreateInputSchema,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Workspace } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function WorkspaceUpdateForm({
  workspace,
  disabled,
}: Readonly<{
  workspace: Workspace;
  disabled?: boolean;
}>) {
  const form = useForm<WorkspacePartial>({
    resolver: zodResolver(WorkspaceUncheckedCreateInputSchema),
    defaultValues: {
      name: workspace.name,
    },
  });

  async function onSubmit(data: WorkspacePartial) {
    const action = updateWorkspace(workspace.id, data);
    toast.promise(action, {
      loading: 'Updating workspace...',
      success: 'Workspace updated successfully',
      error: 'Failed to update workspace',
    });
    await action;

    form.reset(data);
  }

  const isFormDisabled = form.formState.isSubmitting || !form.formState.isDirty;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>
              <FormControl>
                <Input {...field} disabled={disabled} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!disabled && (
          <Button type='submit' disabled={isFormDisabled}>
            Update
          </Button>
        )}
      </form>
    </Form>
  );
}
