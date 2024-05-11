'use client';

import { signOut } from 'next-auth/react';

export default function SignOutBtn(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
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
