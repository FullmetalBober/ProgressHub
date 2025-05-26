import { useTiptapEditor } from '@/context/TiptapEditorContext';
import { useWiki } from '@/context/WikiContext';
import {
  deleteGithubWikiRemoteFile,
  updateGithubWikiRemoteFile,
} from '@/lib/actions/githubApp.action';
import { convertHtmlTaskListToMdCompatible } from '@/lib/utils';
import { GithubWikiFile } from '@prisma/client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import ConfirmationDialog from '../ConfirmationDialog';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '../ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import CreateWikiModal from './CreateWikiModal';

export default function WikiSidebar(
  props: Readonly<{
    wikis: GithubWikiFile[];
  }>
) {
  const params = useParams<{ installationId: string; repositoryId: string }>();
  const { selectedWiki, handleWikiChange } = useWiki();
  const { currentTiptapEditor } = useTiptapEditor();
  const [isSyncing, setIsSyncing] = useState(false);

  const selectedWikiObserved = props.wikis.find(
    wiki => wiki.id === selectedWiki?.id
  );

  const handleSyncWikis = async () => {
    if (!selectedWiki || !currentTiptapEditor.current) return;
    setIsSyncing(true);

    const html = convertHtmlTaskListToMdCompatible(
      currentTiptapEditor.current.getHTML()
    );

    const action = updateGithubWikiRemoteFile(selectedWiki.id, html);
    toast.promise(action, {
      loading: 'Синхронізація сторінки вікі...',
      success: 'Сторінка вікі синхронізована!',
      error: 'Не вдалося синхронізувати сторінку вікі',
    });
    await action;

    setIsSyncing(false);
  };

  const handleSwitchWiki = (wiki: GithubWikiFile) => {
    handleWikiChange(wiki);
  };
  const handleDeleteWiki = async () => {
    if (!selectedWiki) return;

    setIsSyncing(true);
    const action = deleteGithubWikiRemoteFile(selectedWiki.id);
    toast.promise(action, {
      loading: 'Видалення сторінки вікі...',
      success: 'Сторінка вікі видалена!',
      error: 'Не вдалося видалити сторінку вікі',
    });
    await action;

    setIsSyncing(false);
  };

  const disableSyncButton =
    isSyncing ||
    !selectedWikiObserved ||
    !(
      selectedWikiObserved.isModified ||
      selectedWikiObserved.path !== selectedWikiObserved.previousPath
    );
  return (
    <>
      <SidebarTrigger className='absolute z-50 right-1 top-1 md:hidden' />
      <Sidebar side='right'>
        <SidebarTrigger className='absolute z-50 left-[-2rem] top-1 hidden md:block' />
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleSyncWikis}
                disabled={disableSyncButton}
              >
                Синхронізувати з GitHub
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Сторінки</SidebarGroupLabel>
            <CreateWikiModal
              installationId={Number(params.installationId)}
              repositoryId={Number(params.repositoryId)}
              wikiPaths={props.wikis
                .map(wiki => {
                  const paths = [wiki.path];
                  if (wiki.previousPath) paths.push(wiki.previousPath);

                  return paths;
                })
                .flat()}
            />
            <SidebarMenu>
              {props.wikis.map(wiki => (
                <SidebarMenuItem key={wiki.id}>
                  <SidebarMenuButton
                    onClick={() => handleSwitchWiki(wiki)}
                    isActive={selectedWiki?.id === wiki.id}
                  >
                    {!wiki.previousPath && (
                      <span className='bold text-green-600'>N</span>
                    )}
                    {wiki.previousPath && wiki.previousPath !== wiki.path && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className='bold text-green-600'>R</span>
                        </TooltipTrigger>
                        <TooltipContent>{wiki.previousPath}</TooltipContent>
                      </Tooltip>
                    )}
                    {wiki.previousPath && wiki.isModified && (
                      <span className='bold text-yellow-500'>M</span>
                    )}{' '}
                    {wiki.path}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        {selectedWiki && (
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <ConfirmationDialog
                  title='Ви впевнені?'
                  description={
                    <>
                      Ця дія видалить{' '}
                      <span className='font-bold'>{selectedWiki.path}</span>. Ви
                      впевнені, що хочете продовжити?
                    </>
                  }
                  action={handleDeleteWiki}
                  asChild
                >
                  <SidebarMenuButton variant='destructive'>
                    Видалити сторінку
                  </SidebarMenuButton>
                </ConfirmationDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        )}
      </Sidebar>
    </>
  );
}
