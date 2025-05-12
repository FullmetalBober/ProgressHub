'use client';

import { useWiki, WikiProvider } from '@/context/WikiContext';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { SocketWikiEmitterProvider } from '@/providers/SocketWikiProvider';
import TiptapEditor from '@/tiptap/TiptapEditor';
import { GithubWikiFile } from '@prisma/client';
import { User as SessionUser } from 'next-auth';
import { useParams } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import WikiSidebar from './WikiSidebar';

type TEditWikisProps = Readonly<{
  wikis: GithubWikiFile[];
  user: SessionUser;
  tiptapToken: string;
}>;

export default function EditWikis(props: TEditWikisProps) {
  const observableWikis = useSocketObserver('githubWikiFile', props.wikis);
  const params = useParams<{ repositoryId: string }>();

  return (
    <WikiProvider initialSelectedWiki={observableWikis[0]}>
      <SocketWikiEmitterProvider room={params.repositoryId}>
        <SidebarProvider>
          <EditWikisComponent {...props} wikis={observableWikis} />
        </SidebarProvider>
      </SocketWikiEmitterProvider>
    </WikiProvider>
  );
}

function EditWikisComponent({ wikis, user, tiptapToken }: TEditWikisProps) {
  const { selectedWiki } = useWiki();

  const roomDescription = `githubWikiFile.${selectedWiki?.id}`;

  return (
    <>
      {/* <EditIssueTitle {...issue} /> */}
      <SidebarInset>
        {selectedWiki && (
          <TiptapEditor
            room={roomDescription}
            user={user}
            collabToken={tiptapToken}
          />
        )}
      </SidebarInset>
      <WikiSidebar wikis={wikis} />
    </>
  );
}
