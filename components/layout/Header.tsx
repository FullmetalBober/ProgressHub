import { auth } from '@/lib/auth/utils';
import { MountainIcon } from 'lucide-react';
import Link from 'next/link';
import SignOutBtn from '../auth/SignOut';

export default async function Header() {
  const session = await auth();

  return (
    <header className='w-full py-6 container flex items-center justify-between px-4 md:px-6'>
      <Link
        className='flex items-center space-x-2 text-2xl font-bold dark:text-gray-100'
        href='/'
      >
        <MountainIcon className='h-8 w-8' />
        ProgressHub
      </Link>
      <nav className='hidden space-x-4 text-sm md:flex'>
        <Link
          className='font-medium text-gray-900 transition-colors hover:text-gray-900/90 dark:text-gray-50 dark:hover:text-gray-50/90'
          href='/'
        >
          Home
        </Link>
      </nav>
      <div className='flex items-center space-x-4'>
        {!session && (
          <>
            <Link
              className='p-2 font-medium text-gray-900 transition-colors hover:text-gray-900/90 dark:text-gray-50 dark:hover:text-gray-50/90'
              href='/auth/login'
            >
              Login
            </Link>
          </>
        )}
        {session && <SignOutBtn />}
      </div>
    </header>
  );
}
