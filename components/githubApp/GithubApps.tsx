import { getGithubAppInfo } from '@/lib/actions/githubApp.action';
import { GithubAppInstallation } from '@/prisma/zod';
import { GithubApp } from './GithubApp';

export default async function GithubApps(
  props: Readonly<{
    githubAppInstallations: (GithubAppInstallation & {
      createdBy: {
        name: string;
      };
    })[];
  }>
) {
  return (
    <>
      {props.githubAppInstallations.map(async installation => {
        const info = await getGithubAppInfo(installation.id);

        return (
          <GithubApp
            key={installation.id}
            id={installation.id}
            createdBy={installation.createdBy.name}
            info={info}
            date={installation.createdAt}
          />
        );
      })}
    </>
  );
}
