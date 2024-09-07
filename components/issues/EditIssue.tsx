import { env } from '@/lib/env.mjs';
import { Issue } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { User } from 'next-auth';
// import { Input } from '../ui/input';
import dynamic from 'next/dynamic';
const TiptapEditor = dynamic(() => import('@/tiptap/TiptapEditor'), {
  ssr: false,
});

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
      {/* <Input value={issue.title} variant='ghost' textSize='lg' /> */}
      {/* <EditorContent editor={editor} /> */}
      <TiptapEditor
        room={roomDescription}
        user={user}
        collabToken={tiptapToken}
      />
    </div>
  );
}
