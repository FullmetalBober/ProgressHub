'use client';

import { createContext, useContext, useEffect } from 'react';
import { useSocket } from './SocketContext';

type TProvider = {
  children: React.ReactNode;
  room: string;
};
type TContext = {
  emit: (
    entity: string,
    event: string,
    data: {
      [key: string]: unknown;
      id: string;
    }
  ) => void;
};

const SocketEmitterContext = createContext<TContext | null>(null);

export function SocketEmitterProvider({ children, room }: TProvider) {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.emit('join', room);

    return () => {
      socket.emit('leave', room);
    };
  }, [socket, room]);

  const emit = (
    entity: string,
    event: string,
    data: {
      [key: string]: unknown;
      id: string;
    }
  ) => {
    let tries = 0;
    const intervalId = setInterval(() => {
      if (tries > 5) {
        clearInterval(intervalId);
        throw new Error('SocketEmitterProvider: socket is not connected');
      }
      tries += 1;
      if (socket) {
        socket.emit('notify', {
          room: room,
          entity,
          event,
          payload: data,
        });
        clearInterval(intervalId);
      }
    }, 1000);
  };

  return (
    <SocketEmitterContext.Provider value={{ emit }}>
      {children}
    </SocketEmitterContext.Provider>
  );
}

export const useSocketEmitter = () => {
  const socket = useContext(SocketEmitterContext);
  if (!socket) {
    throw new Error('useSocketEmitter must be used within a SocketProvider');
  }
  return socket;
};
