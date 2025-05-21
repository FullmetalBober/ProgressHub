import { Server as SocketIOServer } from 'socket.io';

const io = new SocketIOServer();

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

export const availableEntities = [
  'workspace',
  'issue',
  'workspaceInvite',
  'workspaceMember',
  'githubWikiFile',
  'comment',
  'notification',
] as const;
export const availableEvents = ['create', 'update', 'delete'] as const;

export const emitToRoomChanges = (
  room: string,
  entity: (typeof availableEntities)[number],
  event: (typeof availableEvents)[number],
  payload: Record<string, unknown> & { id: string }
) => {
  io.to(room).emit(`${entity}/${event}`, payload);
  console.log(`Notified room ${room} about ${entity}/${event}`);
};

export default io;
