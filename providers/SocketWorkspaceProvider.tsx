'use client';

import { useSocket } from '@/context/SocketContext';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function SocketWorkspaceEmitterProvider({
  children,
  room,
}: {
  children: React.ReactNode;
  room: string;
}) {
  const { socket } = useSocket();
  const workspaceId = cookies.get('workspaceId');

  useEffect(() => {
    if (!socket) return;
    socket.emit('join', room);

    return () => {
      socket.emit('leave', room);
    };
  }, [socket, room]);

  useEffect(() => {
    cookies.set('workspaceId', room, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });
  }, [room, workspaceId]);

  return children;
}
