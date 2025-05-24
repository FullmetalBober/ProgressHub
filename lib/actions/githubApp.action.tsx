'use server';

import {
  GithubWikiFileUncheckedCreateInputSchema,
  GithubWikiFileUncheckedUpdateInputSchema,
} from '@/prisma/zod';
import { ProbotOctokit } from 'probot';
import prisma from '../db';
import { env } from '../env.mjs';
import { protectAction } from '../protection';
import { notifyUsers, zodValidate } from './utils';

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
    id: installation.id,
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

  await octokit.rest.apps.deleteInstallation({
    installation_id: id,
  });

  const githubAppInstallation = await prisma.githubAppInstallation.delete({
    where: {
      id,
    },
  });

  return githubAppInstallation;
}

export async function getGithubAppRepositories(installationId: number) {
  await protectAction({
    githubAppInstallationId: installationId,
  });

  const localOctokit = new ProbotOctokit({
    auth: {
      appId: env.GITHUB_APP_ID,
      privateKey: env.GITHUB_PRIVATE_KEY,
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      type: 'installation',
      installationId,
    },
  });

  const {
    data: { repositories },
  } = await localOctokit.rest.apps.listReposAccessibleToInstallation();

  return repositories.map(repo => ({
    id: repo.id,
    name: repo.name,
    image: repo.owner.avatar_url,
    description: repo.description,
    isPrivate: repo.private,
  }));
}

export async function checkIfGithubWikiAvailable(
  installationId: number,
  repoId: number
) {
  const res = await fetch(
    `${env.SOCKET_BASE_URL}/api/github/wiki/${installationId}/${repoId}`
  );

  return res.ok;
}

export async function createGithubWikiFile(body: unknown) {
  const data = zodValidate(GithubWikiFileUncheckedCreateInputSchema, body);
  await protectAction({
    githubAppInstallationId: data.installationId,
  });

  const githubWikiFile = await prisma.githubWikiFile.create({
    data: {
      ...data,
    },
  });

  await notifyUsers(
    String(githubWikiFile.githubRepositoryId),
    'githubWikiFile',
    'create',
    githubWikiFile
  );

  return githubWikiFile;
}

export async function updateGithubWikiFile(id: string, body: unknown) {
  const data = zodValidate(GithubWikiFileUncheckedUpdateInputSchema, body);
  const [githubWikiFile] = await Promise.all([
    prisma.githubWikiFile.findFirstOrThrow({
      where: {
        id: id,
      },
    }),
    protectAction({
      githubWikiFileId: id,
    }),
  ]);

  const [updatedGithubWikiFile] = await Promise.all([
    prisma.githubWikiFile.update({
      where: {
        id: githubWikiFile.id,
      },
      data,
    }),
    notifyUsers(
      String(githubWikiFile.githubRepositoryId),
      'githubWikiFile',
      'update',
      {
        id: githubWikiFile.id,
        ...data,
      }
    ),
  ]);

  return updatedGithubWikiFile;
}

export async function updateGithubWikiRemoteFile(
  wikiId: string,
  mdFile: string
) {
  let [githubWikiFile] = await Promise.all([
    prisma.githubWikiFile.findFirstOrThrow({
      where: {
        id: wikiId,
      },
    }),
    protectAction({
      githubWikiFileId: wikiId,
    }),
  ]);

  const res = await fetch(
    `${env.SOCKET_BASE_URL}/api/github/wiki/${githubWikiFile.installationId}/${githubWikiFile.githubRepositoryId}/file`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: githubWikiFile.path,
        oldName: githubWikiFile.previousPath ?? githubWikiFile.path,
        content: mdFile,
      }),
    }
  );
  if (!res.ok) throw new Error('Failed to create wiki file');

  const dataToUpdate = {
    previousPath: githubWikiFile.path,
    isModified: false,
  };
  [githubWikiFile] = await Promise.all([
    prisma.githubWikiFile.update({
      where: {
        id: githubWikiFile.id,
      },
      data: dataToUpdate,
    }),
    notifyUsers(
      String(githubWikiFile.githubRepositoryId),
      'githubWikiFile',
      'update',
      {
        id: githubWikiFile.id,
        ...dataToUpdate,
      }
    ),
  ]);

  return githubWikiFile;
}

export async function deleteGithubWikiRemoteFile(id: string) {
  const [githubWikiFile] = await Promise.all([
    prisma.githubWikiFile.findFirstOrThrow({
      where: {
        id,
      },
    }),
    protectAction({
      githubWikiFileId: id,
    }),
  ]);

  if (githubWikiFile.previousPath) {
    const res = await fetch(
      `${env.SOCKET_BASE_URL}/api/github/wiki/${githubWikiFile.installationId}/${githubWikiFile.githubRepositoryId}/file`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: githubWikiFile.previousPath,
        }),
      }
    );
    if (!res.ok) throw new Error('Failed to delete wiki file');
  }

  await Promise.all([
    prisma.githubWikiFile.delete({
      where: {
        id: githubWikiFile.id,
      },
    }),
    notifyUsers(
      String(githubWikiFile.githubRepositoryId),
      'githubWikiFile',
      'delete',
      githubWikiFile
    ),
  ]);

  return githubWikiFile;
}
