import ImageUploader from '@/components/settings/ImageUploader';
import WorkspaceDelete from '@/components/workspace/WorkspaceDelete';
import WorkspaceUpdateForm from '@/components/workspace/WorkspaceUpdateForm';
import prisma from '@/lib/db/index';
import { getImageUrl } from '@/lib/utils';
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
      members: true,
    },
  });

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div>
          <h1 className='text-2xl font-bold mb-2'>Workspace</h1>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>Logo</h2>
          <div className='bg-gray-800 w-16 h-16 rounded-md flex items-center justify-center'>
            <ImageUploader
              src={getImageUrl(workspace.imageKey)}
              id={workspaceId}
              alt='Workspace logo'
              width={64}
              height={64}
              className='rounded-md'
            />
          </div>
          <p className='text-sm text-gray-400 mt-2'>
            Pick a logo for your workspace. Recommended size is 256x256px. The
            max file size is 15MB.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>General</h2>
          <WorkspaceUpdateForm workspace={workspace} />
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-2'>Delete workspace</h2>
          <p className='text-sm text-gray-400 mb-4'>
            If you want to permanently delete this workspace and all of its
            data, including but not limited to users, issues, and comments, you
            can do so below.
          </p>
          <WorkspaceDelete workspaceId={workspaceId} />
        </div>
      </div>
    </div>
  );
}
