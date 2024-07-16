import { env } from '@/lib/env.mjs';
import TiptapEditor from '@/tiptap/TiptapEditor';
import { Issue } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { User } from 'next-auth';
// import { Input } from '../ui/input';

export default function EditIssue({
  issue,
  user,
}: Readonly<{
  issue: Issue;
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
