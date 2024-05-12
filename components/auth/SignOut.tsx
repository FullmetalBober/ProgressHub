'use client';

import { signOut } from 'next-auth/react';
import { forwardRef } from 'react';

export default forwardRef(function SignOutBtn(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <button
      {...props}
      ref={ref}
      onClick={() =>
        signOut({
          callbackUrl: '/',
        })
      }
    >
      Log out
    </button>
  );
});
