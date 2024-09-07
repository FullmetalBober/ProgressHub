import prisma from '@/lib/db';
import { Database } from '@hocuspocus/extension-database';
import { Logger } from '@hocuspocus/extension-logger';
import { Server } from '@hocuspocus/server';
import express from 'express';
import expressWebsocket from 'express-ws';
import jwt from 'jsonwebtoken';

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
              description: state,
            },
          });
        }
      },
    }),
  ],
  async onAuthenticate({ token }) {
    jwt.verify(token, process.env.TIPTAP_COLLAB_SECRET ?? 'secret');
  },
});

// Setup your express instance using the express-ws extension
const { app } = expressWebsocket(express());

// A basic http route
app.get('/', (_request, response) => {
  response.send('Hello World!');
});

// Add a websocket route for Hocuspocus
// You can set any contextual data like in the onConnect hook
// and pass it to the handleConnection method.
app.ws('/collaboration', (websocket, request) => {
  hocuspocusServer.handleConnection(websocket, request);
});

// Start the server
app.listen(Number(process.env.PORT ?? 1234), () =>
  console.log(`Listening on http://127.0.0.1:${process.env.PORT ?? 1234}`)
);
