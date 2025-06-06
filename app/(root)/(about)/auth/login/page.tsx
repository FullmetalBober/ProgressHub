import { LoginForm } from '@/components/auth/LoginForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Логін',
};

export default function LoginPage() {
  return (
    <div className='flex min-h-svh-body w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>Логін</CardTitle>
              <CardDescription>
                Введіть свою електронну адресу нижче, щоб увійти до свого
                облікового запису
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
