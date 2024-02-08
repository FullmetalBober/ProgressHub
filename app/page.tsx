import SignIn from '@/components/auth/SignIn';
import { getUserAuth } from '@/lib/auth/utils';

export default async function Home() {
  const { session } = await getUserAuth();
  return (
    <main className='space-y-4'>
      {session ? (
        <pre className='whitespace-break-spaces break-all rounded-sm bg-secondary p-4 text-secondary-foreground shadow-sm'>
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : null}
      <SignIn />
    </main>
  );
}
