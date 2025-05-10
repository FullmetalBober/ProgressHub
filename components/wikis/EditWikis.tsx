'use client';

import { GithubWikiFile } from '@prisma/client';
import { User as SessionUser } from 'next-auth';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import WikiSidebar from './WikiSidebar';
const TiptapEditor = dynamic(() => import('@/tiptap/TiptapEditor'));

export default function EditWikis({
  wikis,
  user,
  tiptapToken,
}: Readonly<{
  wikis: GithubWikiFile[];
  user: SessionUser;
  tiptapToken: string;
}>) {
  const [selectedWiki, setSelectedWiki] = useState<GithubWikiFile | undefined>(
    wikis[0]
  );
  // const roomDescription = `wiki.${selectedWiki.id}`;

  return (
    <SidebarProvider>
      {/* <EditIssueProperties issue={issue} users={users} />
      <EditIssueTitle {...issue} /> */}
      {/* <TiptapEditor
        room={roomDescription}
        user={user}
        collabToken={tiptapToken}
      /> */}
      <ul>
        <li>adsasd</li>
      </ul>
      <WikiSidebar />
    </SidebarProvider>
  );
}
