'use client';

import { useSocketEmitter } from '@/context/SocketEmitterContext';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { inviteUserToWorkspace } from '@/lib/actions/workspaceInvite.action';
import {
  User,
  WorkspaceInvite,
  WorkspaceInviteUncheckedCreateInputSchema,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

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
  const { emit } = useSocketEmitter();

  const membersEmails = [
    ...workspaceInvitesObserved.map(invite => invite.email),
    ...workspaceMembers.map(member => member.email),
  ];

  const { toast } = useToast();
  const form = useForm<WorkspaceInvite>({
    resolver: zodResolver(
      WorkspaceInviteUncheckedCreateInputSchema.refine(
        data => !membersEmails.includes(data.email),
        {
          message: 'User is already a member or has been invited',
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
    const createdData = await inviteUserToWorkspace(data);

    toast({
      title: 'Invitation sent successfully!',
    });
    emit('workspaceInvite', 'create', createdData);

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
                <Input placeholder='Enter email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='basis-1/4' disabled={isFormDisabled}>
          Invite
        </Button>
      </form>
    </Form>
  );
}
