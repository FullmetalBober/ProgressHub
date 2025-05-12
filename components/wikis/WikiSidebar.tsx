import { useWiki } from '@/context/WikiContext';
import { GithubWikiFile } from '@prisma/client';
import { useParams } from 'next/navigation';
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
import CreateWikiModal from './CreateWikiModal';

export default function WikiSidebar(
  props: Readonly<{
    wikis: GithubWikiFile[];
  }>
) {
  const params = useParams<{ installationId: string; repositoryId: string }>();
  const { selectedWiki, handleWikiChange } = useWiki();

  const handleSyncWikis = async () => {}

  const handleSwitchWiki = (wiki: GithubWikiFile) => {
    handleWikiChange(wiki);
  };
  const handleDeleteWiki = () => {};
  const handleResetLocalWiki = () => {};

  return (
    <>
      <SidebarTrigger className='absolute z-50 right-1 top-1 md:hidden' />
      <Sidebar side='right'>
        <SidebarTrigger className='absolute z-50 left-[-2rem] top-1 hidden md:block' />
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>Синхронізувати з GitHub</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Сторінки</SidebarGroupLabel>
            <CreateWikiModal
              installationId={Number(params.installationId)}
              repositoryId={Number(params.repositoryId)}
              wikiPaths={props.wikis.map(wiki => wiki.path)}
            />
            <SidebarMenu>
              {props.wikis.map(wiki => (
                <SidebarMenuItem key={wiki.id}>
                  <SidebarMenuButton
                    onClick={() => handleSwitchWiki(wiki)}
                    isActive={selectedWiki?.id === wiki.id}
                  >
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
                  action={async () => {}}
                  asChild
                >
                  <SidebarMenuButton variant='destructive'>
                    Видалити сторінку
                  </SidebarMenuButton>
                </ConfirmationDialog>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <ConfirmationDialog
                  title='Ви впевнені?'
                  description={
                    <>
                      Ця дія скине всі зміни, внесені до{' '}
                      <span className='font-bold'>{selectedWiki.path}</span>. Ви
                      впевнені, що хочете продовжити?
                    </>
                  }
                  action={async () => {}}
                  asChild
                >
                  <SidebarMenuButton variant='destructive'>
                    Скинути зміни
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
