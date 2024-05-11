import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db/index';
import { FolderKanban, Inbox, SquareDot } from 'lucide-react';
import Link from 'next/link';
import CustomAvatar from '../CustomAvatar';
import SignOut from '../auth/SignOut';
import CreateIssueModal from '../issues/CreateIssueModal';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import SidebarButton from './SidebarButton';

export default async function SideBar({
  workspaceId,
}: {
  workspaceId: string;
}) {
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

  // console.log('currentWorkspace', currentWorkspace.members);

  const workspaceUsers = currentWorkspace?.members.map(m => m.user);

  const user = session?.user;
  if (!user?.id) return <div>You are not logged in</div>;
  if (!currentWorkspace) return <div>Workspace not found</div>;
  if (!workspaceUsers) return <div>Workspace users not found</div>;
  return (
    <aside className='pb-12'>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
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
                        <Avatar className='mr-2 h-5 w-5'>
                          <AvatarImage
                            src={
                              workspace?.image ||
                              'https://github.com/shadcn.png'
                            }
                            alt={workspace?.name}
                          />
                          <AvatarFallback>{workspace?.name[0]}</AvatarFallback>
                        </Avatar>
                        {workspace.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
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

            <SidebarButton
              icon={<Inbox />}
              label='Inbox'
              href={`/workspace/${workspaceId}/inbox`}
            />

            <SidebarButton
              icon={<SquareDot />}
              label='My issues'
              href={`/workspace/${workspaceId}/my-issues`}
            />

            <SidebarButton
              icon={<FolderKanban />}
              label='Issues'
              href={`/workspace/${workspaceId}/issues`}
            />
          </div>
        </div>
        {/* <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Library
          </h2>
          <div className='space-y-1'>
            <Button variant='ghost' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='M21 15V6' />
                <path d='M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' />
                <path d='M12 12H3' />
                <path d='M16 6H3' />
                <path d='M12 18H3' />
              </svg>
              Playlists
            </Button>
            <Button variant='ghost' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <circle cx='8' cy='18' r='4' />
                <path d='M12 18V2l7 4' />
              </svg>
              Songs
            </Button>
            <Button variant='ghost' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2' />
                <circle cx='12' cy='7' r='4' />
              </svg>
              Made for You
            </Button>
            <Button variant='ghost' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12' />
                <circle cx='17' cy='7' r='5' />
              </svg>
              Artists
            </Button>
            <Button variant='ghost' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='m16 6 4 14' />
                <path d='M12 6v14' />
                <path d='M8 8v12' />
                <path d='M4 4v16' />
              </svg>
              Albums
            </Button>
          </div>
        </div> */}
      </div>
    </aside>
  );
}
