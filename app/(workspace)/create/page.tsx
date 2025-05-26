import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import WorkspaceCreateForm from '@/components/workspace/WorkspaceCreateForm';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Створити робочий простір',
};

export default function CreateWorkspacePage() {
  return (
    <Card className='max-w-lg mx-auto'>
      <CardHeader>
        <CardTitle>Створити новий робочий простір</CardTitle>
        <CardDescription>
          Робочі простори – це спільні середовища, де команди можуть працювати
          над завданнями та вікі.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WorkspaceCreateForm />
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='ghost' className='w-full' asChild>
          <Link href='/join'>Приєднатися до існуючої робочої області</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
