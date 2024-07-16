'use client';

import { Session } from 'next-auth';
import UpdateEmailCard from './UpdateEmailCard';
import UpdateNameCard from './UpdateNameCard';

export default function UserSettings({
  session,
}: Readonly<{ session: Session | null }>) {
  return (
    <>
      <UpdateNameCard name={session?.user?.name ?? ''} />
      <UpdateEmailCard email={session?.user?.email ?? ''} />
    </>
  );
}
