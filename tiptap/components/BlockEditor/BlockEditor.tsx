'use client';

import '@/tiptap/styles/index.css';
import '../../app/globals.css';

import { EditorContent } from '@tiptap/react';
import { useMemo, useRef } from 'react';

import { LinkMenu } from '@/tiptap/components/menus';

import { useBlockEditor } from '@/tiptap/hooks/useBlockEditor';

import 'cal-sans';

import '@fontsource/inter/100.css';
import '@fontsource/inter/200.css';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import { Sidebar } from '@/tiptap/components/Sidebar';
import { EditorContext } from '@/tiptap/context/EditorContext';
import ImageBlockMenu from '@/tiptap/extensions/ImageBlock/components/ImageBlockMenu';
import { ColumnsMenu } from '@/tiptap/extensions/MultiColumn/menus';
import { TableColumnMenu, TableRowMenu } from '@/tiptap/extensions/Table/menus';
import { ContentItemMenu } from '../menus/ContentItemMenu';
import { TextMenu } from '../menus/TextMenu';
import { EditorHeader } from './components/EditorHeader';
import { TiptapProps } from './types';

export const BlockEditor = ({ ydoc, provider }: TiptapProps) => {
  const menuContainerRef = useRef(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const { editor, users, characterCount, collabState, leftSidebar } =
    useBlockEditor({ ydoc, provider });

  const displayedUsers = users.slice(0, 3);

  const providerValue = useMemo(() => {
    return {};
  }, []);

  if (!editor) {
    return null;
  }

  return (
    <EditorContext.Provider value={providerValue}>
      <div className='flex h-full' ref={menuContainerRef}>
        <Sidebar
          isOpen={leftSidebar.isOpen}
          onClose={leftSidebar.close}
          editor={editor}
        />
        <div className='relative flex flex-col flex-1 h-full overflow-hidden'>
          <EditorHeader
            characters={characterCount.characters()}
            collabState={collabState}
            users={displayedUsers}
            words={characterCount.words()}
            isSidebarOpen={leftSidebar.isOpen}
            toggleSidebar={leftSidebar.toggle}
          />
          <EditorContent
            editor={editor}
            ref={editorRef}
            className='flex-1 overflow-y-auto'
          />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default BlockEditor;
