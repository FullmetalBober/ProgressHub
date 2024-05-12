import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Join to workspace',
};

export default function JoinPage() {
  return (
    <Card className='max-w-lg mx-auto'>
      <CardHeader>
        <CardTitle>You have access to these workspaces</CardTitle>
      </CardHeader>
      <CardContent>
        <form></form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline' asChild>
          <Link href='/create'>Create a new workspace</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
