import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Запит на перевірку',
};

export default function VerifyRequestPage() {
  return (
    <div className='flex min-h-svh-body w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>Запит на перевірку</CardTitle>
              <CardDescription>
                Перевірте свою електронну пошту, щоб отримати посилання для
                підтвердження
              </CardDescription>
            </CardHeader>
            <CardContent>
              Якщо ви не отримали електронного листа, ви можете запросити інше
              посилання для підтвердження, повернувшись на сторінку входу.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
