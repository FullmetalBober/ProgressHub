import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import { Database } from '@hocuspocus/extension-database';
import { Logger } from '@hocuspocus/extension-logger';
import { Server } from '@hocuspocus/server';
import jwt from 'jsonwebtoken';
import { emitToRoomChanges } from './socket';

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
        } else if (entity === 'githubWikiFile') {
          const wiki = await prisma.githubWikiFile.findUnique({
            where: {
              id,
            },
            select: {
              content: true,
            },
          });
          return wiki?.content ?? null;
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
        } else if (entity === 'githubWikiFile') {
          const githubWikiFile = await prisma.githubWikiFile.update({
            where: {
              id,
            },
            data: {
              content: new Uint8Array(state),
              isModified: true,
            },
          });

          emitToRoomChanges(
            String(githubWikiFile.githubRepositoryId),
            'githubWikiFile',
            'update',
            {
              id: githubWikiFile.id,
              isModified: githubWikiFile.isModified,
            }
          );
        }
      },
    }),
  ],
  async onAuthenticate({ token }) {
    jwt.verify(token, env.TIPTAP_COLLAB_SECRET ?? 'secret');
  },
});

export default hocuspocusServer;
