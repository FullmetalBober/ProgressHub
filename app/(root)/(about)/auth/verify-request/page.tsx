import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verify Request',
};

export default function VerifyRequestPage() {
  return (
    <div className='flex min-h-svh-body w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <div className='flex flex-col gap-6'>
          <Card>
            <CardHeader>
              <CardTitle className='text-2xl'>Verify Request</CardTitle>
              <CardDescription>
                Check your email for a verification link
              </CardDescription>
            </CardHeader>
            <CardContent>
              If you did not receive the email, you can request another
              verification link by returning to the login page.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
