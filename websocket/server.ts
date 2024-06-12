import prisma from '@/lib/db';
import { Database } from '@hocuspocus/extension-database';
import { Logger } from '@hocuspocus/extension-logger';
import { Server } from '@hocuspocus/server';
import jsonwebtoken from 'jsonwebtoken';

const server = Server.configure({
  port: Number(process.env.PORT) ?? 1324,
  address: process.env.NODE_ENV !== 'production' ? '127.0.0.1' : undefined,
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
        return Promise.resolve(null);
      },
      store: async ({ documentName, state }) => {
        console.log('store', documentName);
        const [entity, id] = documentName.split('.');

        if (entity === 'description') {
          await prisma.issue.update({
            where: {
              id,
            },
            data: {
              description: state,
            },
          });
        }
      },
    }),
  ],
  async onAuthenticate({ token }) {
    jsonwebtoken.verify(
      token,
      process.env.TIPTAP_COLLAB_SECRET ?? 'supersecret'
    );
  },
});

server.listen();
