import RepositoriesGroups from '@/components/wikis/RepositoriesGroups';
import {
  getGithubAppInfo,
  getRepositoriesWithWikis,
} from '@/lib/actions/githubApp.action';
import prisma from '@/lib/db/index';
import { TGithubAccount } from '@/lib/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wikis',
};

export default async function DashboardPage(
  props: Readonly<{
    params: Promise<{
      workspaceId: string;
    }>;
  }>
) {
  const params = await props.params;
  const { workspaceId } = params;

  const githubAppInstallations = await prisma.githubAppInstallation.findMany({
    where: {
      workspaceId,
    },
  });

  const accountsRepos: TGithubAccount[] = await Promise.all(
    githubAppInstallations.map(async githubAppInstallation => {
      const [githubAppInfo, repositories] = await Promise.all([
        getGithubAppInfo(githubAppInstallation.id),
        getRepositoriesWithWikis(githubAppInstallation.id),
      ]);

      return {
        ...githubAppInfo,
        repositories,
      };
    })
  );

  return <RepositoriesGroups accounts={accountsRepos} />;
}
