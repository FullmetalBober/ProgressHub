import { useEffect, useMemo, useState } from 'react';

import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { Editor, useEditor } from '@tiptap/react';
import type { Doc as YDoc } from 'yjs';

import { ExtensionKit } from '@/tiptap/extensions/extension-kit';
import { User } from 'next-auth';
import { EditorUser } from '../components/BlockEditor/types';
import { userColors } from '../lib/constants';
import { randomElement } from '../lib/utils';

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  ydoc,
  provider,
  user,
}: {
  ydoc: YDoc;
  provider?: TiptapCollabProvider | null;
  user: User;
}) => {
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    WebSocketStatus.Connecting
  );

  const editor = useEditor(
    {
      immediatelyRender: false,
      autofocus: true,
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider,
          user: {
            name: user.name,
            color: randomElement(userColors),
          },
        }),
      ],
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: 'min-h-full',
        },
      },
    },
    [ydoc, provider]
  );

  const users = useMemo(() => {
    if (!editor?.storage.collaborationCursor?.users) {
      return [];
    }

    return editor.storage.collaborationCursor?.users.map((user: EditorUser) => {
      const names = user.name?.split(' ');
      const firstName = names?.[0];
      const lastName = names?.[names.length - 1];
      const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`;

      return { ...user, initials: initials.length ? initials : '?' };
    });
  }, [editor?.storage.collaborationCursor?.users]);

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status);
    });
  }, [provider]);

  window.editor = editor;

  return { editor, users, characterCount, collabState };
};
