'use client';

import { TiptapCollabProvider } from '@hocuspocus/provider';
import 'iframe-resizer/js/iframeResizer.contentWindow';
import { useSearchParams } from 'next/navigation';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { Doc as YDoc } from 'yjs';

import { User } from 'next-auth';
import { BlockEditor } from './components/BlockEditor';

export default function TiptapEditor({
  room,
  user,
}: {
  room: string;
  user: User;
}) {
  const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
  const [collabToken, setCollabToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const hasCollab = parseInt(searchParams.get('noCollab') as string) !== 1;

  useEffect(() => {
    // fetch data
    const dataFetch = async () => {
      const data = await (
        await fetch('/api/collaboration', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ).json();

      const { token } = data;

      // set state when the data received
      setCollabToken(token);
    };

    dataFetch();
  }, []);

  const ydoc = useMemo(() => new YDoc(), []);

  useLayoutEffect(() => {
    if (hasCollab && collabToken) {
      setProvider(
        new TiptapCollabProvider({
          name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${room}`,
          appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? '',
          token: collabToken,
          document: ydoc,
        })
      );
    }
  }, [setProvider, collabToken, ydoc, room, hasCollab]);

  if (hasCollab && (!collabToken || !provider)) return;

  return (
    <BlockEditor
      hasCollab={hasCollab}
      ydoc={ydoc}
      provider={provider}
      user={user}
    />
  );
}
