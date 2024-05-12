'use client';

import { Issue } from '@prisma/client';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Input } from '../ui/input';

export default function EditIssue({ issue }: { issue: Issue }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert m-4 [&>p]:my-2 focus:outline-none',
      },
    },
  });

  return (
    <div>
      <Input value={issue.title} variant='ghost' textSize='lg' />
      <EditorContent editor={editor} />
    </div>
  );
}
