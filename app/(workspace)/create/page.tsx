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
        <WorkspaceCreateForm />
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='ghost' className='w-full' asChild>
          <Link href='/join'>Join an existing workspace</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
