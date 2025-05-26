'use client';

import { acceptWorkspaceInvite } from '@/lib/actions/workspaceInvite.action';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

export function JoinWorkspaceButton({ inviteId }: { inviteId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const workspaceMember = await acceptWorkspaceInvite(inviteId);
    setLoading(false);

    if (workspaceMember) {
      router.push(`/workspace/${workspaceMember.workspaceId}`);
    }
  };

  return (
    <Button disabled={loading} onClick={handleClick} variant='secondary'>
      Приєднатися
    </Button>
  );
}
