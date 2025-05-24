import { useTiptapEditor } from '@/context/TiptapEditorContext';
import { LinkMenu } from '@/tiptap/components/menus';
import { EditorContext } from '@/tiptap/context/EditorContext';
import { ColumnsMenu } from '@/tiptap/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/tiptap/extensions/Table/menus';
import { useBlockEditor } from '@/tiptap/hooks/useBlockEditor';
import '@/tiptap/styles/globals.css';
import '@/tiptap/styles/index.css';
import { EditorContent } from '@tiptap/react';
import { useMemo, useRef } from 'react';
import { TextMenu } from '../menus/TextMenu';
import { TiptapProps } from './types';

export const BlockEditor = ({ ydoc, provider, user }: TiptapProps) => {
  const currentTiptapEditor = useTiptapEditor();
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { editor } = useBlockEditor({ ydoc, provider, user });
  currentTiptapEditor.currentTiptapEditor.current = editor;

  const providerValue = useMemo(() => {
    return {};
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <div ref={menuContainerRef}>
        <EditorContent
          editor={editor}
          ref={editorRef}
          className='overflow-y-auto'
        />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </EditorContext.Provider>
  );
};

export default BlockEditor;
