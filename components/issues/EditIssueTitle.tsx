'use client';

import { useSocketObserver } from '@/hooks/useSocketObserver';
import { updateIssue } from '@/lib/actions/issues.action';
import {
  Issue,
  IssuePartial,
  IssueUncheckedUpdateInputSchema,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutoSize from '../TextareaAutoSize';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

export default function EditIssueTitle(
  issue: Readonly<Pick<Issue, 'id' | 'title'>>
) {
  const [issueObservable] = useSocketObserver('issue', [issue]);
  const { id, title } = issueObservable;

  const form = useForm<IssuePartial>({
    resolver: zodResolver(IssueUncheckedUpdateInputSchema),
    defaultValues: {
      title,
    },
  });

  useEffect(() => {
    form.reset({ title });
  }, [form, title]);

  const onSubmit = async (data: IssuePartial) => {
    if (Object.keys(form.formState.dirtyFields).length === 0) return;
    form.reset(data);

    await updateIssue(id, data);
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='title'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <TextareaAutoSize
                {...field}
                currentValue={title}
                onBlur={form.handleSubmit(onSubmit)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}
