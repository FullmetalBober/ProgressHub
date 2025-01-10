'use client';

import { useSocketEmitter } from '@/context/SocketEmitterContext';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { updateIssue } from '@/lib/actions/issues.action';
import { IssuePartial, IssueUncheckedUpdateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Textarea } from '../ui/textarea';

export default function EditIssueTitle(
  issue: Readonly<{
    id: string;
    title: string;
  }>
) {
  const [issueObservable] = useSocketObserver('issue', [issue]);
  const { id, title } = issueObservable;

  const { emit } = useSocketEmitter();
  const form = useForm<IssuePartial>({
    resolver: zodResolver(IssueUncheckedUpdateInputSchema),
    defaultValues: {
      title,
    },
  });

  useEffect(() => {
    form.reset({ title });
  }, [title]);

  const onSubmit = async (data: IssuePartial) => {
    if (Object.keys(form.formState.dirtyFields).length === 0) return;
    form.reset(data);

    await updateIssue(id, data);
    emit('issue', 'update', {
      id,
      title: data.title,
    });
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                {...field}
                variant='ghost'
                textSize='lg'
                className='pl-3 overflow-hidden resize-none h-[80px]'
                onBlur={form.handleSubmit(onSubmit)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}
