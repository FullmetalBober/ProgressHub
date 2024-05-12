import { LinkMenu } from '@/tiptap/components/menus';
import { EditorContext } from '@/tiptap/context/EditorContext';
import ImageBlockMenu from '@/tiptap/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '@/tiptap/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/tiptap/extensions/Table/menus';
import { useBlockEditor } from '@/tiptap/hooks/useBlockEditor';
import '@/tiptap/styles/index.css';
import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import { EditorContent } from '@tiptap/react';
import 'cal-sans';
import { useMemo, useRef } from 'react';
import '../../app/globals.css';
import { TextMenu } from '../menus/TextMenu';
import { TiptapProps } from './types';

export const BlockEditor = ({ ydoc, provider }: TiptapProps) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { editor } = useBlockEditor({ ydoc, provider });

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
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </EditorContext.Provider>
  );
};

export default BlockEditor;
