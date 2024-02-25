'use client';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';

export default function SignOutBtn() {
  return (
    <Button
      className='p-2'
      variant='ghost'
      onClick={() =>
        signOut({
          callbackUrl: '/',
        })
      }
    >
      Log out
    </Button>
  );
}
