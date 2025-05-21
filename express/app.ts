import { env } from '@/lib/env.mjs';
import express from 'express';
import http from 'http';
import SmeeClient from 'smee-client';
import { WebSocket } from 'ws';
import startCronJobs from './cron';
import hocuspocusServer from './hocuspocus';
import probotMiddleware from './probot';
import router from './router';
import io from './socket';

if (env.ENABLE_CRON_JOBS) startCronJobs();

const app = express();
app.use(probotMiddleware);
app.use(express.json());
app.use('/api', router);

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

let smeeEvent: EventSource;
server.once('listening', () => {
  if (!env.GITHUB_WEBHOOK_PROXY_URL) return;
  const smee = new SmeeClient({
    source: env.GITHUB_WEBHOOK_PROXY_URL,
    target: `${env.SOCKET_BASE_URL}/api/github/webhooks`,
    logger: console,
  });

  smeeEvent = smee.start();
});

server.once('close', () => {
  if (smeeEvent) smeeEvent.close();
});

export default server;
