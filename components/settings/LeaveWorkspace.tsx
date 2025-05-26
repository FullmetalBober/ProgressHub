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
      loading: 'Ви покидаєте робочий простір...',
      success: 'Ви успішно покинули робочий простір!',
      error: 'Не вдалося покинути робочий простір :(',
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
      Вийти з робочого простору
    </Button>
  );
}
