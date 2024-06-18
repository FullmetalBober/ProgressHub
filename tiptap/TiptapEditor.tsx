'use client';

import { TiptapCollabProvider } from '@hocuspocus/provider';
import 'iframe-resizer/js/iframeResizer.contentWindow';
import { useLayoutEffect, useMemo, useState } from 'react';
import { Doc as YDoc } from 'yjs';

import { env } from '@/lib/env.mjs';
import { User } from 'next-auth';
import { BlockEditor } from './components/BlockEditor';

export default function TiptapEditor({
  room,
  user,
  collabToken,
}: {
  room: string;
  user: User;
  collabToken: string;
}) {
  const ydoc = useMemo(() => new YDoc(), []);
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);

  useLayoutEffect(() => {
    setProvider(
      new TiptapCollabProvider({
        name: room,
        baseUrl: env.NEXT_PUBLIC_TIPTAP_COLLAB_BASE_URL,
        token: collabToken,
        document: ydoc,
      })
    );
  }, [setProvider, ydoc, room, collabToken]);

  if (!provider) return;

  return <BlockEditor ydoc={ydoc} provider={provider} user={user} />;
}
