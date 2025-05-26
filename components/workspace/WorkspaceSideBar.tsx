import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db/index';
import { BookOpen, FolderKanban, Inbox } from 'lucide-react';
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
import SidebarButtonNotification from './SidebarButtonNotification';

export default async function WorkspaceSideBar({
  workspaceId,
}: Readonly<{
  workspaceId: string;
}>) {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.email)
    return <div>Ви не ввійшли в систему</div>;

  const [user, workspaceInvitation] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        workspaces: {
          include: {
            workspace: {
              include: {
                members: {
                  select: { user: true },
                  where: {
                    workspaceId,
                  },
                },
              },
            },
          },
        },
        notifications: {
          where: {
            issue: {
              workspaceId,
            },
            isRead: false,
          },
          select: {
            id: true,
            isRead: true,
          },
        },
      },
    }),
    prisma.workspaceInvite.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    }),
  ]);
  if (!user) return <div>Ви не ввійшли в систему</div>;

  const currentWorkspace = user.workspaces.find(
    w => w.workspace.id === workspaceId
  )?.workspace;
  const otherWorkspaces = user.workspaces
    .filter(w => w.workspace.id !== workspaceId)
    .map(w => w.workspace);

  const workspaceUsers = currentWorkspace?.members.map(m => m.user);

  if (!currentWorkspace) return <div>Робочу область не знайдено</div>;
  if (!workspaceUsers)
    return <div>Користувачів робочої області не знайдено</div>;
  return (
    <aside className='space-y-4'>
      <div className='pr-4'>
        <div className='space-y-1'>
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
                    Налаштування
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href='/join' className='relative'>
                    <span>Створити/приєднатися до робочого простору</span>
                    {workspaceInvitation && (
                      <div className='absolute flex h-3 w-3 right-0 top-0'>
                        <div className='animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75' />
                        <div className='rounded-full inline-flex h-full w-full bg-white' />
                      </div>
                    )}
                  </Link>
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

          <ScrollArea>
            <SidebarButtonNotification
              icon={<Inbox />}
              label='Сповіщення'
              href={`/workspace/${workspaceId}/notifications`}
              notifications={user.notifications}
            />
            <SidebarButton
              icon={<FolderKanban />}
              label='Завдання'
              href={`/workspace/${workspaceId}/issues`}
            />
            <SidebarButton
              icon={<BookOpen />}
              label='Вікі'
              href={`/workspace/${workspaceId}/wikis`}
            />
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
}
