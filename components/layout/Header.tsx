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
        <Link
          className='font-medium text-gray-900 transition-colors hover:text-gray-900/90 dark:text-gray-50 dark:hover:text-gray-50/90'
          href='#'
        >
          Features
        </Link>
        <Link
          className='font-medium text-gray-900 transition-colors hover:text-gray-900/90 dark:text-gray-50 dark:hover:text-gray-50/90'
          href='#'
        >
          Pricing
        </Link>
        <Link
          className='font-medium text-gray-900 transition-colors hover:text-gray-900/90 dark:text-gray-50 dark:hover:text-gray-50/90'
          href='#'
        >
          Contact
        </Link>
      </nav>
      <div className='flex items-center space-x-4'>
        {!session && (
          <>
            <Link
              className='p-2 font-medium text-gray-900 transition-colors hover:text-gray-900/90 dark:text-gray-50 dark:hover:text-gray-50/90'
              href='/auth/login'
            >
              Log in
            </Link>
            <Link
              className='inline-flex h-9 items-center justify-center rounded-md bg-gray-900 p-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90'
              href='#'
            >
              Sign up
            </Link>
          </>
        )}
        {session && <SignOutBtn />}
      </div>
    </header>
  );
}
