'use client';

import { signIn } from 'next-auth/react';
import { Icons } from '../Icons';
import { Button } from '../ui/button';

export default function GithubAuth() {
  return (
    <Button
      variant='outline'
      type='button'
      // disabled={isLoading}
      onClick={() => signIn('github', { callbackUrl: '/' })}
    >
      {/* {isLoading ? (
    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
  ) : ( */}
      <Icons.GitHub className='mr-2 h-4 w-4' />
      {/* )} */} GitHub
    </Button>
  );
}
