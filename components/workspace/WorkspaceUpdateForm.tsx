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
import { useToast } from '@/components/ui/use-toast';
import { updateWorkspace } from '@/lib/actions/workspaces.action';
import {
  WorkspacePartial,
  WorkspaceUncheckedCreateInputSchema,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Workspace } from '@prisma/client';
import { useForm } from 'react-hook-form';

export default function WorkspaceUpdateForm({
  workspace,
}: Readonly<{
  workspace: Workspace;
}>) {
  const { toast } = useToast();
  const form = useForm<WorkspacePartial>({
    resolver: zodResolver(WorkspaceUncheckedCreateInputSchema),
    defaultValues: {
      name: workspace.name,
    },
  });

  async function onSubmit(data: WorkspacePartial) {
    try {
      await updateWorkspace(workspace.id, data);

      form.reset(data);
      toast({
        title: 'Workspace updated successfully!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          'There was a problem with your request. Please try again later.',
      });
    }
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isFormDisabled}>
          Update
        </Button>
      </form>
    </Form>
  );
}
