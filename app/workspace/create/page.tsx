import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { createWorkspace } from '@/lib/actions/workspaces.action';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Create a workspace',
};

export default function CreateWorkspacePage() {
  return (
    <Card className='max-w-lg mx-auto'>
      <CardHeader>
        <CardTitle>Create a new workspace</CardTitle>
        <CardDescription>
          Workspaces are shared environments where teams can work on projects,
          cycles and tasks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={createWorkspace} className='grid gap-3'>
          <Input placeholder='Enter workspace name' name='name' required />
          <Button className='w-full' type='submit'>
            Create workspace
          </Button>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='ghost' className='w-full' asChild>
          <Link href='/workspace/join'>Join an existing workspace</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
