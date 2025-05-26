import Image from 'next/image';
import Link from 'next/link';

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
                Сучасна платформа для управління проєктами
              </h1>
              <p className='md:leading-paragraph/loose max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl lg:text-2xl xl:text-3xl'>
                ProgressHub дозволяє легко відстежувати проблеми та
                співпрацювати з вашою командою.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link
                className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                href='/auth/login'
              >
                Зареєструватися безкоштовно
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
                Легке відстеження проблем
              </h2>
              <p className='md:leading-paragraph/loose max-w-[500px] text-gray-500 dark:text-gray-400'>
                Інтуїтивно зрозумілий інтерфейс ProgressHub дозволяє легко
                створювати, оновлювати та визначати пріоритети проблем.
              </p>
            </div>
          </div>
          <div className='flex flex-col justify-center space-y-4'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
                Співпрацюйте зі своєю командою
              </h2>
              <p className='md:leading-paragraph/loose max-w-[500px] text-gray-500 dark:text-gray-400'>
                Функції співпраці ProgressHub спрощують спільну роботу.
                Призначайте завдання, щоб усі були в курсі подій.
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
                Довіряють команди будь-якого розміру
              </h2>
              <p className='md:leading-paragraph/loose max-w-[600px] text-gray-500 dark:text-gray-400'>
                Приєднуйтесь до тисяч команд, які довіряють ProgressHub для
                відстеження проблем та управління проєктами.
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
                Простий. Інтуїтивний. Потужний.
              </h2>
              <p className='md:leading-paragraph/loose max-w-[600px] text-gray-500 dark:text-gray-400'>
                ProgressHub розроблено, щоб допомогти вашій команді зосередитися
                на тому, що важливо — на розробці чудових продуктів. Завдяки
                зручному інтерфейсу, безперебійним функціям співпраці та
                інтегрованим інструментам управління проєктами, ProgressHub має
                все необхідне для оптимізації вашого робочого процесу та
                досягнення результатів.
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
    </>
  );
}
