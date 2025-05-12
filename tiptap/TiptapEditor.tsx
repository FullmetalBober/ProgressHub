'use client';

import { env } from '@/lib/env.mjs';
import { TiptapCollabProvider } from '@hocuspocus/provider';
// import 'iframe-resizer/js/iframeResizer.contentWindow';
import { User } from 'next-auth';
import { useEffect, useState } from 'react';
import { Doc as YDoc } from 'yjs';
import { BlockEditor } from './components/BlockEditor';

export default function TiptapEditor({
  room,
  user,
  collabToken,
}: Readonly<{
  room: string;
  user: User;
  collabToken: string;
}>) {
  const [ydoc, setYdoc] = useState<YDoc>();
  const [provider, setProvider] = useState<TiptapCollabProvider>();

  useEffect(() => {
    const ydoc = new YDoc();
    const newProvider = new TiptapCollabProvider({
      name: room,
      baseUrl: `${env.NEXT_PUBLIC_SOCKET_BASE_URL}${env.NEXT_PUBLIC_HOCUSPOCUS_PATH}`,
      token: collabToken,
      document: ydoc,
    });

    setYdoc(ydoc);
    setProvider(newProvider);
    console.log('TiptapEditor: provider', newProvider);

    return () => {
      newProvider.destroy();
      ydoc.destroy();
    };
  }, [room, collabToken]);

  if (!provider || !ydoc) return;
  return <BlockEditor key={room} ydoc={ydoc} provider={provider} user={user} />;
}
