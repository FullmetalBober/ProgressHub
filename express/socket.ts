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

export default io;
