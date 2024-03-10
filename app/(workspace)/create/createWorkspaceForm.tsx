'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createWorkspace } from '@/lib/actions/workspaces.action';

export default function CreateWorkspaceFormPage() {
  return (
    <form action={createWorkspace} className='grid gap-3'>
      <Input placeholder='Enter workspace name' required />
      <Button className='w-full'>Create workspace</Button>
    </form>
  );
}
