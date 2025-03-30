import ImageUploader from '@/components/settings/ImageUploader';
import { updateUserImage } from '@/lib/actions/user.action';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db/index';
import { getImageUrl } from '@/lib/utils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
};

export default async function UserSettingPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div>
          <h1 className='text-2xl font-bold mb-2'>Profile</h1>
        </div>

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
            15MB.
          </p>
        </div>
      </div>
    </div>
  );
}
