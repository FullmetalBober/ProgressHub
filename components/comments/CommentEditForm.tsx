'use client';

import { Button } from '@/components/ui/button';
import { updateComment } from '@/lib/actions/comments.action';
import { Comment, CommentUncheckedUpdateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AutosizeTextarea } from '../ui/autosize-textarea';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

export default function CommentEditForm({
  commentId,
  body,
  isEditMode,
  onEditModeChange,
}: Readonly<{
  commentId: string;
  body: string;
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
}>) {
  const form = useForm<Comment>({
    resolver: zodResolver(CommentUncheckedUpdateInputSchema),
    defaultValues: {
      body,
    },
  });

  useEffect(() => {
    form.reset({ body });
  }, [body]);

  async function onSubmit(data: Partial<Comment>) {
    const action = updateComment(commentId, data);
    toast.promise(action, {
      loading: 'Оновлення коментаря...',
      success: 'Коментар оновлено',
      error: 'Помилка при оновленні коментаря',
    });
    await action;

    onEditModeChange(false);
  }

  function handleCancel() {
    onEditModeChange(false);
    form.reset();
  }

  const isFormDisabled = form.formState.isSubmitting || !form.formState.isValid;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='p-0 flex items-end'>
          <div className='flex-1'>
            <FormField
              control={form.control}
              name='body'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AutosizeTextarea
                      readOnly={!isEditMode}
                      minHeight={30}
                      placeholder='Залиште коментар...'
                      className='resize-none border-none focus-visible:ring-offset-0 focus-visible:ring-0 text-base'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        {isEditMode && (
          <div className='p-0 flex justify-end gap-4'>
            <Button onClick={handleCancel} type='button' variant='outline'>
              Cancel
            </Button>
            <Button type='submit' disabled={isFormDisabled}>
              Save
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
