'use client';

import { useSocket } from '@/context/SocketContext';
import { transformDatesInObject } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type entities =
  | 'issue'
  | 'workspaceInvite'
  | 'workspaceMember'
  | 'githubWikiFile'
  | 'comment';

export function useSocketObserver<T extends { id: string }>(
  eventName: entities,
  initValues: T[],
  onDelete?: () => void
) {
  const { socket } = useSocket();
  const [state, setState] = useState<T[]>(initValues);
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data: T) => {
      data = transformDatesInObject(data);
      setState(prev =>
        prev.map(issue =>
          issue.id === data.id ? { ...issue, ...data } : issue
        )
      );
    };

    const handleCreate = (data: T) => {
      data = transformDatesInObject(data);
      setState(prev => [...prev, data]);
    };

    const handleDelete = (data: T) => {
      setState(prev => prev.filter(issue => issue.id !== data.id));
      onDelete?.();
    };

    socket.on(`${eventName}/update`, handleUpdate);
    socket.on(`${eventName}/create`, handleCreate);

    socket.on(`${eventName}/delete`, handleDelete);

    return () => {
      socket.off(`${eventName}/update`, handleUpdate);
      socket.off(`${eventName}/create`, handleCreate);
      socket.off(`${eventName}/delete`, handleDelete);
    };
  }, [socket, eventName, onDelete, router]);

  return state;
}
