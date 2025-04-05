'use server';

import { ProbotOctokit } from 'probot';
import prisma from '../db';
import { env } from '../env.mjs';
import { protectAction } from '../protection';

const octokit = new ProbotOctokit({
  auth: {
    appId: env.GITHUB_APP_ID,
    privateKey: env.GITHUB_PRIVATE_KEY,
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  },
});

export async function getGithubAppInfo(id: number) {
  await protectAction({
    githubAppInstallationId: id,
  });

  const { data: installation } = await octokit.rest.apps.getInstallation({
    installation_id: id,
  });
  if (!installation?.account) {
    throw new Error('Installation not found');
  }

  return {
    name:
      'login' in installation.account
        ? installation.account.login
        : installation.account.name,
    avatarUrl: installation.account.avatar_url,
  };
}

export async function removeGithubAppInstallation(id: number) {
  await protectAction(
    {
      githubAppInstallationId: id,
    },
    ['OWNER', 'ADMIN']
  );

  const githubAppInstallation = await prisma.githubAppInstallation.delete({
    where: {
      id,
    },
  });

  await octokit.rest.apps.deleteInstallation({
    installation_id: githubAppInstallation.id,
  });

  return githubAppInstallation;
}
