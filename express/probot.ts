import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import { createNodeMiddleware, Probot } from 'probot';

const probot = new Probot({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_PRIVATE_KEY,
  secret: env.GITHUB_WEBHOOK_SECRET,
  logLevel: 'debug',
});

function handle(app: Probot) {
  app.on('installation.deleted', async context => {
    console.log(context.payload.installation.id);
    await prisma.githubAppInstallation.delete({
      where: {
        id: context.payload.installation.id,
      },
    });
  });
}

const probotMiddleware = createNodeMiddleware(handle, {
  probot,
  webhookPath: '/api/github/webhooks',
});

export default probotMiddleware;
