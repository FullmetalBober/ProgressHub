'use client';

import { signOut } from 'next-auth/react';
import type { Ref } from 'react';

export default function SignOutBtn(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    ref?: Ref<HTMLButtonElement>;
  }
) {
  return (
    <button
      {...props}
      onClick={() =>
        signOut({
          callbackUrl: '/',
        })
      }
    >
      Log out
    </button>
  );
}
