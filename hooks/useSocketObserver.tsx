'use client';

import { useSocket } from '@/context/SocketContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type entities = 'issue';

export function useSocketObserver<T extends { id: string }>(
  eventName: entities,
  initValues: T[],
  navigateOnDeletePath?: string
) {
  const { socket } = useSocket();
  const [state, setState] = useState<T[]>(initValues);
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    socket.on(`${eventName}/update`, (data: T) => {
      setState(prev =>
        prev.map(issue =>
          issue.id === data.id ? { ...issue, ...data } : issue
        )
      );
    });

    socket.on(`${eventName}/create`, (data: T) => {
      setState(prev => [...prev, data]);
    });

    socket.on(`${eventName}/delete`, (data: T) => {
      setState(prev => prev.filter(issue => issue.id !== data.id));
      if (navigateOnDeletePath) {
        router.push(navigateOnDeletePath);
      }
    });

    return () => {
      socket.off(`${eventName}/update`);
      socket.off(`${eventName}/create`);
      socket.off(`${eventName}/delete`);
    };
  }, [socket]);

  return state;
}
