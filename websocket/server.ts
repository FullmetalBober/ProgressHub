import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import { Database } from '@hocuspocus/extension-database';
import { Logger } from '@hocuspocus/extension-logger';
import { Server } from '@hocuspocus/server';
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server as SocketIOServer } from 'socket.io';
import WebSocket from 'ws';

const hocuspocusPath = env.NEXT_PUBLIC_HOCUSPOCUS_PATH;

const server = http.createServer((_req, res) => {
  res.end('v0.0.1');
});
const io = new SocketIOServer(server, {
  cors: {
    origin: env.WEB_DEPLOYMENT_URL,
  },
});
const wss = new WebSocket.Server({ noServer: true });

const hocuspocusServer = Server.configure({
  extensions: [
    new Logger(),
    new Database({
      fetch: async ({ documentName }) => {
        const [entity, id] = documentName.split('.');

        if (entity === 'description') {
          const issue = await prisma.issue.findUnique({
            where: {
              id,
            },
            select: {
              description: true,
            },
          });

          return issue?.description ?? null;
        }
        return null;
      },
      store: async ({ documentName, state }) => {
        const [entity, id] = documentName.split('.');

        if (entity === 'description') {
          await prisma.issue.update({
            where: {
              id,
            },
            data: {
              description: new Uint8Array(state),
            },
          });
        }
      },
    }),
  ],
  async onAuthenticate({ token }) {
    jwt.verify(token, env.TIPTAP_COLLAB_SECRET ?? 'secret');
  },
});

wss.on('connection', (ws, req) => {
  hocuspocusServer.handleConnection(ws, req);
});

server.on('upgrade', (req, socket, head) => {
  if (req.url !== hocuspocusPath) return;
  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit('connection', ws, req);
  });
});

type TNotifyData = {
  room: string;
  entity: string;
  event: string;
  payload: Record<string, unknown>;
};

const entities = ['issue'];
const events = ['create', 'update', 'delete'];
io.on('connection', socket => {
  socket.on('join', (room: unknown) => {
    if (typeof room !== 'string') throw new Error('Room must be a string');
    socket.join(room);
  });

  socket.on('notify', (data?: Partial<TNotifyData>) => {
    const { room, entity, event, payload } = data ?? {};

    if (!payload?.id) throw new Error('Payload must have an id');
    else if (typeof room !== 'string') throw new Error('Room must be a string');
    else if (typeof entity !== 'string')
      throw new Error('Entity must be a string');
    else if (typeof event !== 'string')
      throw new Error('Event must be a string');
    else if (!entities.includes(entity) || !events.includes(event)) {
      throw new Error(`Invalid entity or event: ${entity}/${event}`);
    }

    io.to(room).emit(`${entity}/${event}`, payload);
  });
});

server.listen(process.env.PORT ?? 4000, () => {
  console.log('Server is running on http://localhost:4000');
  console.log('Socket.IO path: http://localhost:4000');
  console.log(`Hocuspocus endpoint: ws://localhost:4000${hocuspocusPath}`);
});
