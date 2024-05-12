'use client';

import { createIssue } from '@/lib/actions/issues.action';
import { IssueUncheckedCreateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import AssigneeComboboxFormField from './AssigneeComboboxFormField';
import PriorityComboboxFormField from './PriorityComboboxFormField';
import StatusComboboxFormField from './StatusComboboxFormField';

export default function CreateIssueModal({
  workspaceId,
  userId,
  users,
}: {
  workspaceId: string;
  userId: string;
  users: User[];
}) {
  const router = useRouter();
  const { toast } = useToast();

  //! Prisma.IssueUncheckedCreateInput
  const form = useForm<any>({
    resolver: zodResolver(IssueUncheckedCreateInputSchema),
    // mode: 'onChange',
    defaultValues: {
      workspaceId,
      identifier: -1,
      title: '',
      description: '',
      status: 'BACKLOG',
      priority: 'NO_PRIORITY',
      assigneeId: userId,
    },
  });

  //! Prisma.IssueUncheckedCreateInput
  async function onSubmit(data: any) {
    try {
      const res = await createIssue(data);

      toast({
        title: 'Issue created successfully!',
      });
      router.push(`/workspace/${workspaceId}/issues/${res?.identifier}`);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary'>
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-3xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Create issue</DialogTitle>
              <DialogDescription>
                Create a new issue in the current workspace.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Username</FormLabel> */}
                  <FormControl>
                    <Input placeholder='Issue title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='Add description...'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex gap-2 flex-wrap'>
              <StatusComboboxFormField form={form} />
              <PriorityComboboxFormField form={form} />
              <AssigneeComboboxFormField form={form} users={users} />
            </div>

            <DialogFooter>
              <Button type='submit' disabled={isFormDisabled}>
                Create issue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
