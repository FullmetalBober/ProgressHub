'use client';

import { useSocket } from '@/context/SocketContext';
import { useEffect } from 'react';

export function SocketWikiEmitterProvider({
  children,
  room,
}: {
  children: React.ReactNode;
  room: string;
}) {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.emit('join', room);

    return () => {
      socket.emit('leave', room);
    };
  }, [socket, room]);

  return children;
}
