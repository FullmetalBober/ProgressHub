'use client';

import { useSocketObserver } from '@/hooks/useSocketObserver';
import { updateIssue } from '@/lib/actions/issues.action';
import {
  Issue,
  IssuePartial,
  IssueUncheckedUpdateInputSchema,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Textarea } from '../ui/textarea';

const resizeTextarea = (
  e: React.FormEvent<HTMLTextAreaElement> | HTMLTextAreaElement
) => {
  const target = e instanceof HTMLTextAreaElement ? e : e.currentTarget;
  target.style.height = '0px';
  target.style.height = target.scrollHeight + 'px';
};

export default function EditIssueTitle(
  issue: Readonly<Pick<Issue, 'id' | 'title'>>
) {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const [issueObservable] = useSocketObserver('issue', [issue]);
  const { id, title } = issueObservable;

  const form = useForm<IssuePartial>({
    resolver: zodResolver(IssueUncheckedUpdateInputSchema),
    defaultValues: {
      title,
    },
  });

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.value = title;
      resizeTextarea(titleRef.current);
    }
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
              <Textarea
                {...field}
                ref={node => {
                  field.ref(node);
                  titleRef.current = node;
                }}
                variant='ghost'
                textSize='3xl'
                className='pl-3 overflow-hidden resize-none h-[80px]'
                onBlur={form.handleSubmit(onSubmit)}
                onInput={resizeTextarea}
                onKeyDown={e => {
                  if (e.key === 'Enter') e.preventDefault();
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}
