import GithubApps from '@/components/githubApp/GithubApps';
import ImageUploader from '@/components/settings/ImageUploader';
import { Button } from '@/components/ui/button';
import WorkspaceDelete from '@/components/workspace/WorkspaceDelete';
import WorkspaceUpdateForm from '@/components/workspace/WorkspaceUpdateForm';
import { updateWorkspaceImage } from '@/lib/actions/workspaces.action';
import { auth } from '@/lib/auth/utils';
import prisma from '@/lib/db/index';
import { env } from '@/lib/env.mjs';
import { checkIsOwner, checkIsOwnerOrAdmin, getImageUrl } from '@/lib/utils';
import { Plus } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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
      members: true,
      githubAppInstallation: {
        include: {
          createdBy: true,
        },
      },
    },
  });

  const isOwner = checkIsOwner(userId, workspace.members);
  const isOwnerOrAdmin = checkIsOwnerOrAdmin(userId, workspace.members);

  const ImageTag = isOwnerOrAdmin ? ImageUploader : Image;

  const githubState = btoa(
    JSON.stringify({
      workspaceId,
      userId,
    })
  );

  return (
    <div className='min-h-screen bg-black text-white p-8'>
      <div className='max-w-3xl mx-auto space-y-12'>
        <div>
          <h1 className='text-2xl font-bold mb-2'>Workspace</h1>
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>Logo</h2>
          <div className='bg-gray-800 w-16 h-16 rounded-md flex items-center justify-center'>
            <ImageTag
              src={getImageUrl(workspace.image)}
              id={workspaceId}
              action={updateWorkspaceImage}
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
          <WorkspaceUpdateForm
            workspace={workspace}
            disabled={!isOwnerOrAdmin}
          />
        </div>

        <div>
          <h2 className='text-xl font-semibold mb-4'>Github</h2>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-lg'>Connected accounts</h3>
            <Button variant='ghost' asChild>
              <Link
                href={`https://github.com/apps/${env.NEXT_PUBLIC_GITHUB_APP_NAME}/installations/select_target?state=${githubState}`}
                target='_blank'
              >
                <Plus />
              </Link>
            </Button>
          </div>
          <GithubApps
            githubAppInstallations={workspace.githubAppInstallation}
          />
          <p className='text-sm text-gray-400 mt-2'>
            Github account cannot be connected to multiple workspaces.
          </p>
        </div>

        {isOwner && (
          <div>
            <h2 className='text-xl font-semibold mb-2'>Delete workspace</h2>
            <p className='text-sm text-gray-400 mb-4'>
              If you want to permanently delete this workspace and all of its
              data, including but not limited to users, issues, and comments,
              you can do so below.
            </p>
            <WorkspaceDelete workspaceId={workspaceId} />
          </div>
        )}
      </div>
    </div>
  );
}
