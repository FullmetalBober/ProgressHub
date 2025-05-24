import ImageUploader from '@/components/settings/ImageUploader';
import LeaveWorkspace from '@/components/settings/LeaveWorkspace';
import UserUpdateForm from '@/components/settings/UserUpdateForm';
import { updateUserImage } from '@/lib/actions/user.action';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db/index';
import { getImageUrl } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function UserSettingPage({
  params,
}: Readonly<{
  params: Promise<{ workspaceId: string }>;
}>) {
  const { workspaceId } = await params;
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    include: {
      workspaces: {
        where: {
          workspaceId,
        },
      },
    },
  });

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <h1 className='text-2xl font-bold mb-2'>Profile</h1>

        <div>
          <h2 className='text-xl font-semibold mb-4'>Avatar</h2>
          <div className='bg-gray-800 w-16 h-16 rounded-md flex items-center justify-center'>
            <ImageUploader
              src={getImageUrl(user.image)}
              id={userId}
              action={updateUserImage}
              alt='User avatar'
              width={64}
              height={64}
              className='rounded-md'
            />
          </div>
          <p className='text-sm text-gray-400 mt-2'>
            Pick a avatar. Recommended size is 256x256px. The max file size is
            14MB.
          </p>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>General</h2>
          <UserUpdateForm user={user} />
        </div>

        {user.workspaces[0].role !== 'OWNER' && (
          <div>
            <h2 className='text-xl font-semibold mb-4'>Workspace</h2>
            <LeaveWorkspace />
          </div>
        )}
      </div>
    </div>
  );
}
