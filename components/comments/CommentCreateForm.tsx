'use client';

import { Button } from '@/components/ui/button';
import { createComment } from '@/lib/actions/comments.action';
import { cn } from '@/lib/utils';
import { Comment, CommentUncheckedCreateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveUp } from 'lucide-react';
import type { User as SessionUser } from 'next-auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

export default function CommentCreateForm({
  user,
  issueId,
  parentId,
}: Readonly<{
  user: SessionUser;
  issueId: string;
  parentId?: string;
}>) {
  const form = useForm<Comment>({
    resolver: zodResolver(CommentUncheckedCreateInputSchema),
    defaultValues: {
      parentId,
      authorId: user.id,
      issueId,
      body: '',
    },
  });

  async function onSubmit(data: Comment) {
    const action = createComment(data);
    toast.promise(action, {
      loading: 'Creating comment...',
      success: 'Comment created',
      error: 'Error creating comment',
    });
    await action;

    form.reset();
  }

  const isFormDisabled = form.formState.isSubmitting || !form.formState.isValid;
  return (
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(onSubmit)}>
        <Card className={cn(parentId && 'border-none')}>
          <CardContent className='p-0 flex items-end'>
            <div className='flex-1'>
              <FormField
                control={form.control}
                name='body'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <AutosizeTextarea
                        minHeight={parentId ? 30 : 55}
                        placeholder='Залиште коментар...'
                        className='resize-none border-none focus-visible:ring-offset-0 focus-visible:ring-0 text-base'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type='submit'
              className='rounded-full m-2 w-8 h-8'
              size='icon'
              variant='outline'
              disabled={isFormDisabled}
            >
              <MoveUp />
            </Button>
          </CardContent>
          <CardFooter className='flex justify-end p-0'></CardFooter>
        </Card>
      </form>
    </Form>
  );
}
