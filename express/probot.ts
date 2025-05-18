import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import { StatusType } from '@/prisma/zod';
import { createNodeMiddleware, Probot } from 'probot';
import io from './socket';

const probot = new Probot({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_PRIVATE_KEY,
  secret: env.GITHUB_WEBHOOK_SECRET,
  logLevel: 'debug',
});

const mappedStatus: Record<StatusType, string> = {
  BACKLOG: 'Backlog',
  TODO: 'Todo',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
  CANCELED: 'Canceled',
};

async function moveIssueTo(
  installationId: number,
  branchName: string,
  status: StatusType
) {
  const issueIdentifier = RegExp(/#(\d+)/).exec(branchName);

  if (!issueIdentifier) return;

  const issueId = issueIdentifier[1];
  const issue = await prisma.issue.findFirst({
    where: {
      identifier: Number(issueId),
      workspace: {
        githubAppInstallation: {
          some: {
            id: installationId,
          },
        },
      },
    },
  });
  if (!issue) return;

  if (issue.status === status) return;

  const [issueUpdated, comment] = await prisma.$transaction([
    prisma.issue.update({
      where: {
        id: issue.id,
      },
      data: {
        status,
      },
    }),
    prisma.comment.create({
      data: {
        body: `Branch ${branchName} created, issue moved to '${mappedStatus[status]}'`,
        issueId: issue.id,
        isSystem: true,
      },
    }),
  ]);

  io.to(issue.workspaceId).emit(`issue/update`, {
    id: issueUpdated.id,
    status: issueUpdated.status,
  });
  io.to(issue.id).emit(`comment/create`, comment);
}

function handle(app: Probot) {
  app.on('installation.deleted', async context => {
    console.log(context.payload.installation.id);
    await prisma.githubAppInstallation.delete({
      where: {
        id: context.payload.installation.id,
      },
    });
  });
  app.on('create', async context => {
    const { ref_type, ref, installation } = context.payload;

    if (!installation) return;

    if (ref_type === 'branch') {
      const branchName = ref;

      moveIssueTo(installation.id, branchName, 'IN_PROGRESS');
    }
  });
}

const probotMiddleware = createNodeMiddleware(handle, {
  probot,
  webhookPath: '/api/github/webhooks',
});

export default probotMiddleware;
