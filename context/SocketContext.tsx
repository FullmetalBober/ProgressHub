'use client';

import { env } from '@/lib/env.mjs';
import { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

type TProvider = {
  children: React.ReactNode;
};
type TContext = {
  socket?: Socket;
};

const SocketContext = createContext<TContext | null>(null);

export function SocketProvider({ children }: TProvider) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketInstance = io(env.NEXT_PUBLIC_SOCKET_BASE_URL);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};
