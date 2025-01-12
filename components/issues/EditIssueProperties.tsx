'use client';

import { useSocketEmitter } from '@/context/SocketEmitterContext';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { updateIssue } from '@/lib/actions/issues.action';
import {
  Issue,
  IssuePartial,
  IssueUncheckedUpdateInputSchema,
  User,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { Form } from '../ui/form';
import AssigneeComboboxFormField from './AssigneeComboboxFormField';
import PriorityComboboxFormField from './PriorityComboboxFormField';
import StatusComboboxFormField from './StatusComboboxFormField';

export default function EditIssueProperties({
  issue,
  users,
}: Readonly<{
  issue: Pick<Issue, 'id' | 'status' | 'priority' | 'assigneeId'>;
  users: User[];
}>) {
  const [issueObserved] = useSocketObserver('issue', [issue]);
  const { id, status, priority, assigneeId } = issueObserved;

  const { emit } = useSocketEmitter();
  const form = useForm<IssuePartial>({
    resolver: zodResolver(IssueUncheckedUpdateInputSchema),
    defaultValues: { id, status, priority, assigneeId },
    reValidateMode: 'onChange',
  });

  const onSubmit = async (data: IssuePartial) => {
    const toUpdate = Object.keys(form.formState.dirtyFields).reduce(
      (acc, key) => ({ ...acc, [key]: data[key as keyof IssuePartial] }),
      {}
    );
    form.reset(data);

    await updateIssue(id, toUpdate);
    emit('issue', 'update', {
      id,
      ...toUpdate,
    });
  };

  const onSubmitDebounced = useDebouncedCallback(
    form.handleSubmit(onSubmit),
    3_000
  );

  useEffect(() => {
    form.resetField('status', {
      defaultValue: status,
    });
  }, [form, status]);

  useEffect(() => {
    form.resetField('priority', {
      defaultValue: priority,
    });
  }, [form, priority]);

  useEffect(() => {
    form.resetField('assigneeId', {
      defaultValue: assigneeId,
    });
  }, [form, assigneeId]);

  useEffect(() => {
    if (!form.formState.isDirty) return;
    onSubmitDebounced();
  }, [onSubmitDebounced, form.formState.isDirty]);

  return (
    <Form {...form}>
      <div className='flex gap-2 flex-wrap'>
        <StatusComboboxFormField form={form} />
        <PriorityComboboxFormField form={form} />
        <AssigneeComboboxFormField form={form} users={users} />
      </div>
    </Form>
  );
}
