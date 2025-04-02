import { env } from '@/lib/env.mjs';
import server from './app';

const hocuspocusPath = env.NEXT_PUBLIC_HOCUSPOCUS_PATH;

const port = process.env.PORT ?? 4000;

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Socket.IO path: http://localhost:${port}`);
  console.log(`Hocuspocus endpoint: ws://localhost:${port}${hocuspocusPath}`);
});
