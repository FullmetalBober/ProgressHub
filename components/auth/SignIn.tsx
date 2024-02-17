'use client';
import { Button } from '@/components/ui/button';
import { AuthSession } from '@/lib/auth/utils';
import { signIn, signOut } from 'next-auth/react';

type Props = {
  session: AuthSession['session'];
};

export default function SignIn({ session }: Props) {
  if (session) {
    return (
      <Button variant={'destructive'} onClick={() => signOut()}>
        Sign out
      </Button>
    );
  }
  return <Button onClick={() => signIn()}>Sign in</Button>;
}
