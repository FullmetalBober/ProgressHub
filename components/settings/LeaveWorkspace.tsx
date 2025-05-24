'use client';

import { leaveWorkspace } from '@/lib/actions/workspaceMember.action';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

export default function LeaveWorkspace() {
  const params = useParams<{
    workspaceId: string;
  }>();
  const [isLeaving, setIsLeaving] = useState(false);
  const router = useRouter();

  const handleLeaveWorkspace = async () => {
    setIsLeaving(true);
    const action = leaveWorkspace(params.workspaceId);
    toast.promise(action, {
      loading: 'Leaving workspace...',
      success: 'You have left the workspace.',
      error: 'Failed to leave workspace. Please try again.',
    });
    await action;
    setIsLeaving(false);
    router.push('/');
  };

  return (
    <Button
      variant='destructive'
      onClick={handleLeaveWorkspace}
      disabled={isLeaving}
    >
      Leave Workspace
    </Button>
  );
}
