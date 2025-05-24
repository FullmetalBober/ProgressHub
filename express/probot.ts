import { statusesIssue } from '@/config/constants';
import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import { IssueStatusType } from '@/prisma/zod';
import { createNodeMiddleware, Probot } from 'probot';
import { emitToRoomChanges } from './socket';

const probot = new Probot({
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_PRIVATE_KEY,
  secret: env.GITHUB_WEBHOOK_SECRET,
  logLevel: 'debug',
});

async function moveIssueTo(
  installationId: number,
  branchName: string,
  message: string,
  status: IssueStatusType
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
        body: `${message}, issue moved to '${
          statusesIssue.find(s => s.value === status)?.label
        }'`,
        issueId: issue.id,
        isSystem: true,
      },
    }),
  ]);

  emitToRoomChanges(issue.workspaceId, 'issue', 'update', {
    id: issueUpdated.id,
    status: issueUpdated.status,
  });
  emitToRoomChanges(issue.id, 'comment', 'create', comment);
}

function handle(app: Probot) {
  app.on('installation.deleted', async context => {
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

      moveIssueTo(
        installation.id,
        branchName,
        `Branch ${branchName} created`,
        'IN_PROGRESS'
      );
    }
  });
  app.on(['pull_request.opened', 'pull_request.reopened'], async context => {
    const { pull_request, installation } = context.payload;
    if (!installation) return;
    const branchName = pull_request.head.ref;

    moveIssueTo(
      installation.id,
      branchName,
      `Pull request for ${branchName} opened`,
      'IN_REVIEW'
    );
  });
  app.on('pull_request.closed', async context => {
    const { pull_request, installation } = context.payload;
    if (!installation) return;
    const branchName = pull_request.head.ref;

    if (pull_request.merged) {
      moveIssueTo(
        installation.id,
        branchName,
        `Pull request for ${branchName} merged`,
        'DONE'
      );
    } else {
      moveIssueTo(
        installation.id,
        branchName,
        `Pull request for ${branchName} closed without merging`,
        'IN_PROGRESS'
      );
    }
  });
}

const probotMiddleware = createNodeMiddleware(handle, {
  probot,
  webhookPath: '/api/github/webhooks',
});

export default probotMiddleware;
