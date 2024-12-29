import { env } from '@/lib/env.mjs';
import { Issue } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { User } from 'next-auth';
import dynamic from 'next/dynamic';
import EditIssueTitle from './EditIssueTitle';
const TiptapEditor = dynamic(() => import('@/tiptap/TiptapEditor'));

export default function EditIssue({
  issue,
  user,
}: Readonly<{
  issue: Omit<Issue, 'description'>;
  user: User;
}>) {
  const roomDescription = `description.${issue.id}`;
  const tiptapToken = jwt.sign({}, env.TIPTAP_COLLAB_SECRET);

  return (
    <div>
      <EditIssueTitle {...issue} />
      <TiptapEditor
        room={roomDescription}
        user={user}
        collabToken={tiptapToken}
      />
    </div>
  );
}
