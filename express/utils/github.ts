import { env } from '@/lib/env.mjs';
import { ProbotOctokit } from 'probot';
import { z } from 'zod';

const defaultAuthOctokitOptions = {
  appId: env.GITHUB_APP_ID,
  privateKey: env.GITHUB_PRIVATE_KEY,
  clientId: env.GITHUB_CLIENT_ID,
  clientSecret: env.GITHUB_CLIENT_SECRET,
};

const octokit = new ProbotOctokit({
  auth: defaultAuthOctokitOptions,
});

export async function getRepoInfo(installationId: number, repoId: number) {
  const localOctokit = new ProbotOctokit({
    auth: {
      ...defaultAuthOctokitOptions,
      type: 'installation',
      installationId,
    },
  });

  const { data: repoData } = await localOctokit.request(
    'GET /repositories/:id',
    {
      id: repoId,
    }
  );

  return repoData;
}

const tokenSchema = z.object({
  token: z.string(),
});

export async function getGithubToken(installationId: number) {
  const tokenData = await octokit.auth({
    type: 'installation',
    installationId,
  });

  const parsedTokenData = tokenSchema.parse(tokenData);

  return parsedTokenData.token;
}
