'use client';

import { useWiki, WikiProvider } from '@/context/WikiContext';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { cn } from '@/lib/utils';
import { SocketRoomEmitterProvider } from '@/providers/SocketRoomProvider';
import TiptapEditor from '@/tiptap/TiptapEditor';
import { GithubWikiFile } from '@prisma/client';
import { User as SessionUser } from 'next-auth';
import { useParams, useSearchParams } from 'next/navigation';
import { SidebarProvider, useSidebar } from '../ui/sidebar';
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
    <SocketRoomEmitterProvider room={params.repositoryId}>
      <WikiProvider initialSelectedWiki={selectedWiki}>
        <SidebarProvider>
          <EditWikisComponent {...props} wikis={sortedWikis} />
        </SidebarProvider>
      </WikiProvider>
    </SocketRoomEmitterProvider>
  );
}

function EditWikisComponent({ wikis, user, tiptapToken }: TEditWikisProps) {
  const { selectedWiki } = useWiki();
  const { state, isMobile } = useSidebar();

  const roomDescription = `githubWikiFile.${selectedWiki?.id}`;

  return (
    <>
      {selectedWiki && (
        <div
          key={selectedWiki.id}
          className={cn(
            'transition-all duration-300',
            state === 'expanded' && !isMobile
              ? `w-[calc(100%-16rem)]`
              : 'w-full'
          )}
        >
          <EditWikiTitle
            wiki={selectedWiki}
            wikiPaths={wikis
              .map(wiki => {
                const paths = [wiki.path];
                if (wiki.previousPath) paths.push(wiki.previousPath);

                return paths;
              })
              .flat()
              .filter(path => path !== selectedWiki.path)}
          />
          <TiptapEditor
            room={roomDescription}
            user={user}
            collabToken={tiptapToken}
          />
        </div>
      )}
      <WikiSidebar wikis={wikis} />
    </>
  );
}
