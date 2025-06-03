import AlertMessage from '@/components/AlertMessage';
import EditWikis from '@/components/wikis/EditWikis';
import { checkIfGithubWikiAvailable } from '@/lib/actions/githubApp.action';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import jwt from 'jsonwebtoken';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вікі',
};

export default async function WikiPage(
  props: Readonly<{
    params: Promise<{
      installationId: string;
      workspaceId: string;
      repositoryId: string;
    }>;
  }>
) {
  const params = await props.params;
  const tiptapToken = jwt.sign({}, env.TIPTAP_COLLAB_SECRET);

  const [session, wikis, isRepositoryWikiAvailable] = await Promise.all([
    auth(),
    prisma.githubWikiFile.findMany({
      where: {
        installationId: Number(params.installationId),
        githubRepositoryId: Number(params.repositoryId),
      },
    }),
    checkIfGithubWikiAvailable(
      Number(params.installationId),
      Number(params.repositoryId)
    ),
  ]);

  if (!session?.user)
    return <AlertMessage title='Ви не автентифіковані' variant='destructive' />;
  if (!isRepositoryWikiAvailable) {
    return (
      <AlertMessage title='Вікі недоступне' variant='destructive'>
        Вікі репозиторій недоступний, спробуйте створити першу сторінку Wiki
        вручну, аби активувати можливість редагування
      </AlertMessage>
    );
  }
  return (
    <div>
      <EditWikis wikis={wikis} user={session.user} tiptapToken={tiptapToken} />
    </div>
  );
}
