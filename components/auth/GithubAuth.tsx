'use client';

import { signIn } from 'next-auth/react';
import { Icons } from '../Icons';
import { Button } from '../ui/button';

export default function GithubAuth(
  props: React.ComponentPropsWithoutRef<'button'>
) {
  return (
    <Button
      variant='outline'
      type='button'
      {...props}
      onClick={() => signIn('github', { callbackUrl: '/' })}
    >
      <Icons.GitHub className='mr-2 h-4 w-4' />
      GitHub
    </Button>
  );
}
