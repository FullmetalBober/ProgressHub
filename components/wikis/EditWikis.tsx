'use client';

import { WikiProvider } from '@/context/WikiContext';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { SocketWikiEmitterProvider } from '@/providers/SocketWikiProvider';
import { GithubWikiFile } from '@prisma/client';
import { User as SessionUser } from 'next-auth';
import { useParams } from 'next/navigation';
import { SidebarProvider } from '../ui/sidebar';
import WikiSidebar from './WikiSidebar';

export default function EditWikis({
  wikis,
  user,
  tiptapToken,
}: Readonly<{
  wikis: GithubWikiFile[];
  user: SessionUser;
  tiptapToken: string;
}>) {
  const observableWikis = useSocketObserver('githubWikiFile', wikis);
  const params = useParams<{ repositoryId: string }>();

  // const roomDescription = `wiki.${selectedWiki.id}`;

  return (
    <WikiProvider initialSelectedWiki={observableWikis[0]}>
      <SocketWikiEmitterProvider room={params.repositoryId}>
        <SidebarProvider>
          {/* <EditIssueProperties issue={issue} users={users} />
      <EditIssueTitle {...issue} /> */}
          {/* <TiptapEditor
        room={roomDescription}
        user={user}
        collabToken={tiptapToken}
        /> */}
          <WikiSidebar wikis={observableWikis} />
        </SidebarProvider>
      </SocketWikiEmitterProvider>
    </WikiProvider>
  );
}
