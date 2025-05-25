'use client';

import { createIssue } from '@/lib/actions/issues.action';
import { Issue, IssueUncheckedCreateInputSchema, User } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SquarePen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import AssigneeComboboxFormField from './AssigneeComboboxFormField';
import PriorityComboboxFormField from './PriorityComboboxFormField';
import StatusComboboxFormField from './StatusComboboxFormField';

export default function CreateIssueModal({
  workspaceId,
  userId,
  users,
}: Readonly<{
  workspaceId: string;
  userId: string;
  users: User[];
}>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<Issue>({
    resolver: zodResolver(IssueUncheckedCreateInputSchema),
    defaultValues: {
      workspaceId,
      identifier: -1,
      title: '',
      status: 'BACKLOG',
      priority: 'NO_PRIORITY',
      assigneeId: userId,
    },
  });

  async function onSubmit(data: Issue) {
    const action = createIssue(data);
    toast.promise(action, {
      loading: 'Creating issue...',
      success: 'Issue created!',
      error: 'Failed to create issue',
    });
    const res = await action;

    setOpen(false);
    form.reset();
    router.push(`/workspace/${res.workspaceId}/issues/${res.identifier}`);
  }

  const isFormDisabled = form.formState.isSubmitting;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                  <FormControl>
                    <Input placeholder='Issue title' {...field} />
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
