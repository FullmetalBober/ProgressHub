'use client';

import { useWiki, WikiProvider } from '@/context/WikiContext';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { SocketWikiEmitterProvider } from '@/providers/SocketWikiProvider';
import TiptapEditor from '@/tiptap/TiptapEditor';
import { GithubWikiFile } from '@prisma/client';
import { User as SessionUser } from 'next-auth';
import { useParams, useSearchParams } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import EditWikiTitle from './EditWikiTitle';
import WikiSidebar from './WikiSidebar';

type TEditWikisProps = Readonly<{
  wikis: GithubWikiFile[];
  user: SessionUser;
  tiptapToken: string;
}>;

export default function EditWikis(props: TEditWikisProps) {
  const params = useParams<{ repositoryId: string }>();
  const searchParams = useSearchParams();
  const observableWikis = useSocketObserver('githubWikiFile', props.wikis);
  const sortedWikis = observableWikis.toSorted((a, b) =>
    a.path.localeCompare(b.path)
  );

  const selectedWiki =
    sortedWikis.find(wiki => wiki.id === searchParams.get('pageId')) ||
    sortedWikis[0];

  return (
    <WikiProvider initialSelectedWiki={selectedWiki}>
      <SocketWikiEmitterProvider room={params.repositoryId}>
        <SidebarProvider>
          <EditWikisComponent {...props} wikis={sortedWikis} />
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
      <SidebarInset>
        {selectedWiki && (
          <>
            <EditWikiTitle wiki={selectedWiki} key={selectedWiki.id} />
            <TiptapEditor
              room={roomDescription}
              user={user}
              collabToken={tiptapToken}
            />
          </>
        )}
      </SidebarInset>
      <WikiSidebar wikis={wikis} />
    </>
  );
}
