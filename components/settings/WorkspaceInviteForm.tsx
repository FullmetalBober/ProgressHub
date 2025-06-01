'use client';

import { useSocketObserver } from '@/hooks/useSocketObserver';
import { inviteUserToWorkspace } from '@/lib/actions/workspaceInvite.action';
import {
  User,
  WorkspaceInvite,
  WorkspaceInviteUncheckedCreateInputSchema,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

export default function WorkspaceInviteForm({
  workspaceInvites,
  workspaceMembers,
  workspaceId,
  userId,
}: {
  workspaceInvites: Pick<WorkspaceInvite, 'id' | 'email'>[];
  workspaceMembers: Pick<User, 'id' | 'email'>[];
  workspaceId: string;
  userId: string;
}) {
  const workspaceInvitesObserved = useSocketObserver(
    'workspaceInvite',
    workspaceInvites
  );

  const membersEmails = [
    ...workspaceInvitesObserved.map(invite => invite.email),
    ...workspaceMembers.map(member => member.email),
  ];

  const form = useForm<WorkspaceInvite>({
    resolver: zodResolver(
      WorkspaceInviteUncheckedCreateInputSchema.refine(
        data => !membersEmails.includes(data.email),
        {
          message: 'Користувач вже є учасником або його запросили',
          path: ['email'],
        }
      )
    ),
    defaultValues: {
      email: '',
      workspaceId,
      invitedById: userId,
    },
  });

  async function submitHandler(data: WorkspaceInvite) {
    const action = inviteUserToWorkspace(data);
    toast.promise(action, {
      loading: 'Запрошення користувача...',
      success: 'Користувача запрошено!',
      error: 'Не вдалося запросити користувача',
    });
    await action;

    form.reset();
  }

  const isFormDisabled = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className='flex gap-3'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input placeholder='Ввести email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='basis-1/4' disabled={isFormDisabled}>
          Запросити
        </Button>
      </form>
    </Form>
  );
}
