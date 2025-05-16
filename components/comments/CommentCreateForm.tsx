'use client';

import { Button } from '@/components/ui/button';
import { createComment } from '@/lib/actions/comments.action';
import { Comment, CommentUncheckedCreateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MoveUp } from 'lucide-react';
import type { User as SessionUser } from 'next-auth';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

export default function CommentForm({
  user,
  issueId,
}: Readonly<{
  user: SessionUser;
  issueId: string;
}>) {
  const form = useForm<Comment>({
    resolver: zodResolver(CommentUncheckedCreateInputSchema),
    defaultValues: {
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className='p-0'>
            <FormField
              control={form.control}
              name='body'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AutosizeTextarea
                      placeholder='Залиште коментар...'
                      className='resize-none border-none focus-visible:ring-offset-0 focus-visible:ring-0'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className='flex justify-end p-2'>
            <Button
              type='submit'
              className='rounded-full h-12 w-12'
              variant='outline'
              disabled={isFormDisabled}
            >
              <MoveUp />
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
