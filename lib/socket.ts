'use client';

import { io } from 'socket.io-client';
import { env } from './env.mjs';

export const socket = io(env.NEXT_PUBLIC_SOCKET_BASE_URL);
