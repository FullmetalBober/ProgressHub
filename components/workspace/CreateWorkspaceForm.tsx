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
import { useToast } from '@/components/ui/use-toast';
import { createWorkspace } from '@/lib/actions/workspaces.action';
import { WorkspaceUncheckedCreateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function CreateWorkspaceForm() {
  const router = useRouter();
  const { toast } = useToast();

  //! Prisma.WorkspaceUncheckedCreateInput
  const form = useForm<any>({
    resolver: zodResolver(WorkspaceUncheckedCreateInputSchema),
    defaultValues: {
      name: '',
    },
  });

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

  const isFormDisabled = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-3'>
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
