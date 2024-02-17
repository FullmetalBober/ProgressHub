import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t border-gray-200 dark:border-gray-800'>
      <div className='w-full py-6'>
        <div className='container flex flex-col justify-center gap-4 px-4 md:px-6 lg:flex-row lg:gap-6'>
          <p className='text-center text-xs tracking-wide text-gray-500 dark:text-gray-400 md:text-left'>
            © 2024 ProgressHub. All rights reserved.
          </p>
          <nav className='flex flex-col gap-2 md:ml-auto md:flex-row md:gap-4 lg:gap-2'>
            <Link
              className='dark:hover:underline/gray-400 text-xs tracking-wide text-gray-500 transition-colors hover:underline dark:text-gray-400'
              href='/privacy-policy'
            >
              Privacy Policy
            </Link>
            <Link
              className='dark:hover:underline/gray-400 text-xs tracking-wide text-gray-500 transition-colors hover:underline dark:text-gray-400'
              href='#'
            >
              Terms of Service
            </Link>
            <Link
              className='dark:hover:underline/gray-400 text-xs tracking-wide text-gray-500 transition-colors hover:underline dark:text-gray-400'
              href='#'
            >
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
