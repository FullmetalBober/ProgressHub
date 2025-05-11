import EditWikis from '@/components/wikis/EditWikis';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db';
import { env } from '@/lib/env.mjs';
import jwt from 'jsonwebtoken';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wiki',
};

export default async function WikiPage(
  props: Readonly<{
    params: Promise<{ workspaceId: string; repositoryId: string }>;
  }>
) {
  const params = await props.params;
  const { repositoryId } = params;
  const session = await auth();
  if (!session?.user) return <div>Not authenticated</div>;
  const tiptapToken = jwt.sign({}, env.TIPTAP_COLLAB_SECRET);

  const wikis = await prisma.githubWikiFile.findMany({
    where: {
      githubRepositoryId: Number(repositoryId),
    },
  });

  return (
    <div>
      <EditWikis wikis={wikis} user={session.user} tiptapToken={tiptapToken} />
    </div>
  );
}
