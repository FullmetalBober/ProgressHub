import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import express from 'express';
import { z } from 'zod';
import io from './socket';

const router = express.Router();

const notifySchema = z.object({
  room: z.string(),
  entity: z.enum(['workspace', 'issue', 'workspaceInvite', 'workspaceMember']),
  event: z.enum(['create', 'update', 'delete']),
  payload: z.record(z.unknown()).refine(data => data.id, {
    message: 'Payload must have an id',
  }),
});

const githubAppSchema = z.object({
  id: z.coerce.number(),
  workspaceId: z.string(),
  createdById: z.string(),
});

router.get('/', (_req, res) => {
  res.send('v1.0.1');
});

router.post('/notify', (req, res) => {
  const { room, entity, event, payload } = notifySchema.parse(req.body);

  io.to(room).emit(`${entity}/${event}`, payload);
  console.log(`Notified room ${room} about ${entity}/${event}`);

  res.send('OK');
});

router.get('/github/setup', async (req, res) => {
  const { installation_id, state } = req.query;
  if (!installation_id) {
    res.status(400).send('Missing installation_id');
    return;
  }
  if (!state) {
    res.status(400).send('Missing state');
    return;
  }
  const statePlain = Buffer.from(state.toString(), 'base64').toString('utf8');
  const { workspaceId, userId } = JSON.parse(statePlain);

  const data = githubAppSchema.parse({
    id: installation_id,
    workspaceId,
    createdById: userId,
  });

  await prisma.githubAppInstallation.create({
    data,
  });

  res.redirect(
    `${env.WEB_DEPLOYMENT_URL}/workspace/${workspaceId}/settings/general`
  );
});

export default router;
