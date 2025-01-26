import WorkspaceMembersTable from '@/components/settings/MembersTable';
import prisma from '@/lib/db/index';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workspace',
};

export default async function WorkspaceSettingPage(
  props: Readonly<{ params: Promise<{ workspaceId: string }> }>
) {
  const params = await props.params;
  const { workspaceId } = params;

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
    },
  });

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div>
          <h1 className='text-2xl font-bold mb-2'>Members</h1>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>Members</h2>
          <WorkspaceMembersTable workspaceMembers={workspace.members} />
        </div>

        {/* <div>
          <h2 className='text-xl font-semibold mb-4'>General</h2>
          <WorkspaceUpdateForm workspace={workspace} />
        </div> */}
      </div>
    </div>
  );
}
