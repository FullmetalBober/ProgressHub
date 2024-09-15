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
          <ScrollArea className='h-screen'>
            <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
              Workspace
            </h2>
            <SidebarButton
              label='General'
              href={`/workspace/${workspaceId}/settings/general`}
            />
            <SidebarButton
              label='Members'
              href={`/workspace/${workspaceId}/settings/members`}
            />
            <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
              My Account
            </h2>
            <SidebarButton
              label='Profile'
              href={`/workspace/${workspaceId}/settings/profile`}
            />
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
