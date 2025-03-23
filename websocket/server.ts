import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import { Database } from '@hocuspocus/extension-database';
import { Logger } from '@hocuspocus/extension-logger';
import { Server } from '@hocuspocus/server';
import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';
import { Server as SocketIOServer } from 'socket.io';
import WebSocket from 'ws';
import { z } from 'zod';

const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: env.WEB_DEPLOYMENT_URL,
  },
});
const hocuspocusPath = env.NEXT_PUBLIC_HOCUSPOCUS_PATH;

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

app.get('/', (_req, res) => {
  res.send('v1.0.0');
});

const notifySchema = z.object({
  room: z.string(),
  entity: z.enum(['workspace', 'issue', 'workspaceInvite', 'workspaceMember']),
  event: z.enum(['create', 'update', 'delete']),
  payload: z.record(z.unknown()).refine(data => data.id, {
    message: 'Payload must have an id',
  }),
});

app.post('/notify', (req, res) => {
  const { room, entity, event, payload } = notifySchema.parse(req.body);

  io.to(room).emit(`${entity}/${event}`, payload);
  console.log(`Notified room ${room} about ${entity}/${event}`);

  res.send('OK');
});

io.on('connection', socket => {
  socket.on('join', (room: unknown) => {
    if (typeof room !== 'string') throw new Error('Room must be a string');
    socket.join(room);
    console.log(`Socket ${socket.id} joined room ${room}`);
  });

  socket.on('leave', (room: unknown) => {
    if (typeof room !== 'string') throw new Error('Room must be a string');
    socket.leave(room);
    console.log(`Socket ${socket.id} left room ${room}`);
  });
});

const wss = new WebSocket.Server({
  noServer: true,
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

const port = process.env.PORT ?? 4000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Socket.IO path: http://localhost:${port}`);
  console.log(`Hocuspocus endpoint: ws://localhost:${port}${hocuspocusPath}`);
});
