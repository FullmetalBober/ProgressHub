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

router.get('/', (_req, res) => {
  res.send('v1.0.1');
});

router.post('/notify', (req, res) => {
  const { room, entity, event, payload } = notifySchema.parse(req.body);

  io.to(room).emit(`${entity}/${event}`, payload);
  console.log(`Notified room ${room} about ${entity}/${event}`);

  res.send('OK');
});

export default router;
