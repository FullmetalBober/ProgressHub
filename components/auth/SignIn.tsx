'use client';
import { Button } from '@/components/ui/button';
import { Session } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';

type Props = {
  session: Session;
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
