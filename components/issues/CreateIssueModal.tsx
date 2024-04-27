'use client';

import { IssueUncheckedCreateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Prisma } from '@prisma/client';
import { SquarePen } from 'lucide-react';
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
import PriorityComboboxFormField from './PriorityComboboxFormField';
import StatusComboboxFormField from './StatusComboboxFormField';

export default function CreateIssueModal({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const form = useForm<Prisma.IssueUncheckedCreateInput>({
    resolver: zodResolver(IssueUncheckedCreateInputSchema),
    defaultValues: {
      workspaceId,
      title: '',
      description: '',
      status: 'BACKLOG',
      priority: 'NO_PRIORITY',
    },
  });

  async function onSubmit(data: Prisma.IssueUncheckedCreateInput) {
    console.log(data);
    // data.workspaceId = workspaceId;

    // const formData = new FormData();
    // Object.keys(data).forEach(key => formData.append(key, data[key]));

    // const res = await createIssue(formData);
    // console.log(res);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='secondary'>
              <SquarePen />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
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

            <div className='flex gap-2'>
              <StatusComboboxFormField form={form} />

              <PriorityComboboxFormField form={form} />
            </div>

            <DialogFooter>
              <Button type='submit'>Create issue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
