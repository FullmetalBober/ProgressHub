import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default async function Home() {
  return (
    <>
      <section className='w-full py-12 lg:py-24 xl:py-32'>
        <div className='container grid gap-6 px-4 text-center md:grid-cols-2 md:gap-10 md:px-6 lg:gap-16'>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <Image
              alt='ProgressHub'
              className='aspect-[2/1] overflow-hidden rounded-lg object-cover'
              height='250'
              src='/placeholder.svg'
              width='500'
            />
          </div>
          <div className='flex flex-col items-center justify-center space-y-4'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                The modern issue tracking platform for teams
              </h1>
              <p className='md:leading-paragraph/loose max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl lg:text-2xl xl:text-3xl'>
                ProgressHub makes it easy to track issues, collaborate with your
                team, and keep projects moving forward.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link
                className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                href='#'
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 lg:py-24 xl:py-32'>
        <div className='container grid max-w-5xl gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-20'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Easy issue tracking
              </h2>
              <p className='md:leading-paragraph/loose max-w-[500px] text-gray-500 dark:text-gray-400'>
                ProgressHub&apos;s intuitive interface lets you create, update,
                and prioritize issues with ease. Add comments, upload files, and
                link related issues without leaving the platform.
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Collaborate with your team
              </h2>
              <p className='md:leading-paragraph/loose max-w-[500px] text-gray-500 dark:text-gray-400'>
                ProgressHub&apos;s collaboration features make it simple to work
                together. Mention team members, assign tasks, and set due dates
                to keep everyone on the same page.
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Powerful project management
              </h2>
              <p className='md:leading-paragraph/loose max-w-[500px] text-gray-500 dark:text-gray-400'>
                ProgressHub integrates issue tracking with project management.
                Create custom workflows, visualize progress with kanban boards,
                and automate repetitive tasks with built-in workflows.
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Insights at a glance
              </h2>
              <p className='md:leading-paragraph/loose max-w-[500px] text-gray-500 dark:text-gray-400'>
                ProgressHub&apos;s dashboard provides real-time insights into
                your projects. Track progress, identify bottlenecks, and make
                data-driven decisions to keep your team moving forward.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='w-full py-12 lg:py-24 xl:py-32'>
        <div className='container grid gap-10 px-4 md:grid-cols-2 md:gap-10 md:px-6'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Trusted by teams of all sizes
              </h2>
              <p className='md:leading-paragraph/loose max-w-[600px] text-gray-500 dark:text-gray-400'>
                Join the thousands of teams who trust ProgressHub for their
                issue tracking and project management needs.
              </p>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Image
              alt='Users'
              className='aspect-[2/1] overflow-hidden rounded-lg object-cover'
              height='300'
              src='/placeholder.svg'
              width='600'
            />
          </div>
        </div>
      </section>
      <section className='w-full py-12 lg:py-24 xl:py-32'>
        <div className='container grid gap-10 px-4 md:grid-cols-2 md:gap-10 md:px-6'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Simple. Intuitive. Powerful.
              </h2>
              <p className='md:leading-paragraph/loose max-w-[600px] text-gray-500 dark:text-gray-400'>
                ProgressHub is designed to help your team focus on what matters
                — shipping great products. With its user-friendly interface,
                seamless collaboration features, and integrated project
                management tools, ProgressHub has everything you need to
                streamline your workflow and deliver results.
              </p>
            </div>
          </div>
          <div className='flex items-center justify-center'>
            <Image
              alt='Laptop'
              className='aspect-[16/9] overflow-hidden rounded-lg object-cover'
              height='300'
              src='/placeholder.svg'
              width='600'
            />
          </div>
        </div>
      </section>
      <section className='w-full py-12 lg:py-24 xl:py-32'>
        <div className='container grid max-w-5xl gap-10 px-4 md:px-6'>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Ready to supercharge your team&apos;s productivity?
              </h2>
              <p className='md:leading-paragraph/loose max-w-[600px] text-gray-500 dark:text-gray-400'>
                Try ProgressHub&apos;s issue tracking and project management
                platform for free. Sign up now and take the first step towards
                smoother workflows, better collaboration, and more successful
                projects.
              </p>
            </div>
            <form className='flex flex-col gap-4 md:flex-row'>
              <Input placeholder='Enter your email' required type='email' />
              <Button type='submit'>Sign up for free</Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
