import SidebarButton from '../layout/SidebarButton';
import { ScrollArea } from '../ui/scroll-area';

export default async function SettingSideBar({
  workspaceId,
}: Readonly<{
  workspaceId: string;
}>) {
  return (
    <aside className='space-y-4'>
      <div className='pr-4'>
        <div className='space-y-1'>
          <ScrollArea className='lg:h-screen'>
            <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
              Робочий простір
            </h2>
            <SidebarButton
              label='Загальне'
              href={`/workspace/${workspaceId}/settings/general`}
            />
            <SidebarButton
              label='Учасники'
              href={`/workspace/${workspaceId}/settings/members`}
            />
            <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
              Мій обліковий запис
            </h2>
            <SidebarButton
              label='Профіль'
              href={`/workspace/${workspaceId}/settings/profile`}
            />
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
