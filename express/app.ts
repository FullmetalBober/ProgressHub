import { env } from '@/lib/env.mjs';
import express from 'express';
import http from 'http';
import { WebSocket } from 'ws';
import hocuspocusServer from './hocuspocus';
import router from './router';
import io from './socket';

const app = express();
app.use(express.json());
app.use(router);

const server = http.createServer(app);

io.attach(server, {
  cors: {
    origin: env.WEB_DEPLOYMENT_URL,
  },
});

const wss = new WebSocket.Server({
  noServer: true,
});

wss.on('connection', (ws, req) => {
  hocuspocusServer.handleConnection(ws, req);
});

server.on('upgrade', (req, socket, head) => {
  if (req.url !== env.NEXT_PUBLIC_HOCUSPOCUS_PATH) return;
  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit('connection', ws, req);
  });
});

export default server;
