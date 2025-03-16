import WorkspaceMembersTable from '@/components/settings/MembersTable';
import WorkspaceInviteForm from '@/components/settings/WorkspaceInviteForm';
import WorkspaceInvitesTable from '@/components/settings/WorkspaceInvitesTable';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db/index';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workspace',
};

export default async function WorkspaceSettingPage(
  props: Readonly<{ params: Promise<{ workspaceId: string }> }>
) {
  const [params, session] = await Promise.all([props.params, auth()]);
  const { workspaceId } = params;
  const userId = session?.user?.id;

  if (!userId) return null;

  const workspace = await prisma.workspace.findUniqueOrThrow({
    where: {
      id: workspaceId,
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      workspaceInvite: true,
    },
  });

  const isOwnerOrAdmin = workspace.members.some(
    ({ user, role }) =>
      (user.id === userId && role === 'OWNER') || role === 'ADMIN'
  );

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div>
          <h1 className='text-2xl font-bold mb-2'>Members</h1>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>Members</h2>
          <WorkspaceMembersTable
            userId={userId}
            isAdmin={isOwnerOrAdmin}
            workspaceMembers={workspace.members}
          />
        </div>

        {isOwnerOrAdmin && (
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold mb-4'>Invite</h2>
            <WorkspaceInviteForm
              workspaceInvites={workspace.workspaceInvite.map(
                ({ id, email }) => ({ id, email })
              )}
              workspaceMembers={workspace.members.map(({ user }) => ({
                id: user.id,
                email: user.email,
              }))}
              workspaceId={workspaceId}
              userId={userId}
            />
            <WorkspaceInvitesTable
              isAdmin={isOwnerOrAdmin}
              workspaceInvites={workspace.workspaceInvite}
            />
          </div>
        )}
      </div>
    </div>
  );
}
