import { env } from '@/lib/env.mjs';
import { User } from '@/prisma/zod';
import { Issue } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { User as SessionUser } from 'next-auth';
import dynamic from 'next/dynamic';
import CopyBranchNameButton from './CopyBranchNameButton';
import EditIssueProperties from './EditIssueProperties';
import EditIssueTitle from './EditIssueTitle';
const TiptapEditor = dynamic(() => import('@/tiptap/TiptapEditor'));

export default async function EditIssue({
  issue,
  user,
  users,
}: Readonly<{
  issue: Issue;
  user: SessionUser;
  users: User[];
}>) {
  const roomDescription = `description.${issue.id}`;
  const tiptapToken = jwt.sign({}, env.TIPTAP_COLLAB_SECRET);

  return (
    <div>
      <div className='flex flex-wrap justify-between items-center'>
        <EditIssueProperties issue={issue} users={users} />
        <CopyBranchNameButton identifier={issue.identifier} />
      </div>
      <EditIssueTitle {...issue} />
      <TiptapEditor
        room={roomDescription}
        user={user}
        collabToken={tiptapToken}
      />
    </div>
  );
}
