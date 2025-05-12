'use server';

import { GithubWikiFileUncheckedCreateInputSchema } from '@/prisma/zod';
import { ProbotOctokit } from 'probot';
import prisma from '../db';
import { env } from '../env.mjs';
import { protectAction } from '../protection';
import { getGithubWikis, notifyUsers, pushMdFile, zodValidate } from './utils';

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

export async function getRepositoriesWithWikis(installationId: number) {
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

  // const filteredRepos = repositories.filter(repo => repo.has_wiki);

  return repositories.map(repo => ({
    id: repo.id,
    name: repo.name,
    image: repo.owner.avatar_url,
    description: repo.description,
    isPrivate: repo.private,
  }));
}

export async function resetLocalGithubRepoWiki(
  installationId: number,
  repoId: number
) {
  await protectAction({
    githubAppInstallationId: installationId,
  });

  const [repoContent, localWiki] = await Promise.all([
    getGithubWikis(installationId, repoId),
    prisma.githubWikiFile.findMany({
      where: {
        githubRepositoryId: repoId,
      },
    }),
  ]);

  const toDeleteLocalWikiIds = localWiki
    .filter(
      localWikiItem =>
        !repoContent.some(repoItem => repoItem.name === localWikiItem.path)
    )
    .map(localWikiItem => localWikiItem.id);
  const toCreateLocalWiki = repoContent
    .filter(
      repoItem =>
        !localWiki.some(localWikiItem => localWikiItem.path === repoItem.name)
    )
    .map(repoItem => ({
      installationId: installationId,
      githubRepositoryId: repoId,
      path: repoItem.name,
    }));

  await Promise.all([
    prisma.$transaction([
      prisma.githubWikiFile.deleteMany({
        where: {
          id: {
            in: toDeleteLocalWikiIds,
          },
        },
      }),
      prisma.githubWikiFile.createMany({
        data: toCreateLocalWiki,
      }),
    ]),
    // notifyUsers()
  ]);

  return;
}

export async function createGithubWikiFile(body: unknown) {
  const data = zodValidate(GithubWikiFileUncheckedCreateInputSchema, body);
  await protectAction({
    githubAppInstallationId: data.installationId,
  });

  const githubWikiFile = await prisma.githubWikiFile.create({
    data,
    include: {
      installation: {
        include: {
          workspace: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  await Promise.all([
    notifyUsers(
      githubWikiFile.installation.workspace.id,
      'githubWikiFile',
      'create',
      githubWikiFile
    ),
    pushMdFile(
      githubWikiFile.installationId,
      githubWikiFile.githubRepositoryId,
      githubWikiFile.path,
      ''
    ),
  ]);

  return githubWikiFile;
}

export async function updateGithubWikiRemoteFile(
  wikiId: string,
  mdFile: string
) {
  const [githubWikiFile] = await Promise.all([
    prisma.githubWikiFile.findFirstOrThrow({
      where: {
        id: wikiId,
      },
    }),
    protectAction({
      githubWikiFileId: wikiId,
    }),
  ]);

  await pushMdFile(
    githubWikiFile.installationId,
    githubWikiFile.githubRepositoryId,
    githubWikiFile.path,
    mdFile
  );
}
