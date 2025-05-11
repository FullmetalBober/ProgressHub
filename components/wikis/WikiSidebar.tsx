import { ChevronRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import ConfirmationDialog from '../ConfirmationDialog';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarTrigger,
} from '../ui/sidebar';
import CreateWikiModal from './CreateWikiModal';

export default function WikiSidebar() {
  const params = useParams<{ installationId: string; repositoryId: string }>();

  const handleSwitchWiki = () => {};
  const handleDeleteWiki = () => {};
  const handleResetLocalWiki = () => {};

  return (
    <Sidebar side='right'>
      <SidebarTrigger className='absolute z-50 left-[-2rem] top-1' />
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
          />
          <SidebarMenu>
            <SidebarMenuItem>
              <Collapsible
                defaultOpen
                className='group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90'
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <ChevronRight className='transition-transform' />
                    Wiki
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton isActive>Wiki 1</SidebarMenuButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuButton>Wiki 2</SidebarMenuButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ConfirmationDialog
              title='Ви впевнені?'
              description={
                <>
                  Ця дія видалить <span className='font-bold'>Wiki 1</span>. Ви
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
                  <span className='font-bold'>ВСІХ</span> файлів. Ви впевнені,
                  що хочете продовжити?
                </>
              }
              action={async () => {}}
              asChild
            >
              <SidebarMenuButton variant='destructive'>
                Скинути всі зміни
              </SidebarMenuButton>
            </ConfirmationDialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
