import TiptapEditor from '@/tiptap/TiptapEditor';
import { Issue } from '@prisma/client';
import { User } from 'next-auth';
// import { Input } from '../ui/input';

export default function EditIssue({
  issue,
  user,
}: {
  issue: Issue;
  user: User;
}) {
  return (
    <div>
      {/* <Input value={issue.title} variant='ghost' textSize='lg' /> */}
      {/* <EditorContent editor={editor} /> */}
      <TiptapEditor room='1' user={user} />
    </div>
  );
}
