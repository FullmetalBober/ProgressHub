'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import GithubAuth from './GithubAuth';

type UserCredentials = {
  email: string;
};

export function LoginForm() {
  const form = useForm<UserCredentials>({
    resolver: zodResolver(UserSchema.pick({ email: true })),
    defaultValues: {
      email: '',
    },
  });

  async function submitHandler(data: UserCredentials) {
    await signIn('nodemailer', data);
  }

  const { isSubmitting } = form.formState;
  const disableSubmit = isSubmitting || !form.formState.isValid;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className='flex flex-col gap-6'>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='m@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit' className='w-full' disabled={disableSubmit}>
            Логін
          </Button>
          <GithubAuth disabled={isSubmitting} />
        </div>
      </form>
    </Form>
  );
}
