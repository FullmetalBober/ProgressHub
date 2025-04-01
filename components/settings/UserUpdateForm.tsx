'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateUser } from '@/lib/actions/user.action';
import { User, UserPartial, UserUpdateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function UserUpdateForm({
  user,
}: Readonly<{
  user: Pick<User, 'id' | 'name'>;
}>) {
  const form = useForm<UserPartial>({
    resolver: zodResolver(UserUpdateInputSchema),
    defaultValues: {
      name: user.name,
    },
  });

  async function onSubmit(data: UserPartial) {
    const action = updateUser(user.id, data);
    toast.promise(action, {
      loading: 'Updating user...',
      success: 'User updated successfully',
      error: 'Failed to update user',
    });
    await action;

    form.reset(data);
  }

  console.log('form', form.formState.errors);

  const isFormDisabled = form.formState.isSubmitting || !form.formState.isDirty;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isFormDisabled}>
          Update
        </Button>
      </form>
    </Form>
  );
}
