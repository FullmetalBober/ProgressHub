import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db/index';
import { FolderKanban } from 'lucide-react';
import Link from 'next/link';
import CustomAvatar from '../CustomAvatar';
import SignOut from '../auth/SignOut';
import CreateIssueModal from '../issues/CreateIssueModal';
import SidebarButton from '../layout/SidebarButton';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ScrollArea } from '../ui/scroll-area';

export default async function WorkspaceSideBar({
  workspaceId,
}: Readonly<{
  workspaceId: string;
}>) {
  const session = await auth();

  const workspaces = await prisma.workspace.findMany({
    where: { members: { some: { userId: session?.user?.id } } },
    include: {
      members: {
        select: { user: true },
      },
    },
  });

  const currentWorkspace = workspaces.find(w => w.id === workspaceId);
  const otherWorkspaces = workspaces.filter(w => w.id !== workspaceId);

  const workspaceUsers = currentWorkspace?.members.map(m => m.user);

  const user = session?.user;
  if (!user?.id) return <div>You are not logged in</div>;
  if (!currentWorkspace) return <div>Workspace not found</div>;
  if (!workspaceUsers) return <div>Workspace users not found</div>;
  return (
    <aside className='space-y-4'>
      <div className='pr-4'>
        <div className='space-y-1'>
          {/* <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Discover
          </h2> */}
          <div className='flex justify-between'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost'>
                  <CustomAvatar
                    src={currentWorkspace?.image}
                    name={currentWorkspace?.name}
                    className='mr-2 h-5 w-5'
                  />
                  {currentWorkspace?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {otherWorkspaces.map(workspace => (
                  <DropdownMenuItem key={workspace.id} asChild>
                    <Link href={`/workspace/${workspace.id}`}>
                      <CustomAvatar
                        src={workspace?.image}
                        name={workspace?.name}
                        className='mr-2 h-5 w-5'
                      />
                      {workspace.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/workspace/${workspaceId}/settings`}>
                    Workspace settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/join'>Create or join a workspace</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className='w-full' asChild>
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <CreateIssueModal
              workspaceId={workspaceId}
              userId={user.id}
              users={workspaceUsers}
            />
          </div>

          {/*//! <SidebarButton
              icon={<Inbox />}
              label='Inbox'
              href={`/workspace/${workspaceId}/inbox`}
            />

            <SidebarButton
              icon={<SquareDot />}
              label='My issues'
              href={`/workspace/${workspaceId}/my-issues`}
            /> */}
          <ScrollArea>
            {/* <ScrollArea className='h-screen'> */}
            <SidebarButton
              icon={<FolderKanban />}
              label='Issues'
              href={`/workspace/${workspaceId}/issues`}
            />
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
