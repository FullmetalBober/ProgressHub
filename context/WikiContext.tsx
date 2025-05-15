'use client';

import useQueryParams from '@/hooks/useQueryParams';
import { GithubWikiFile } from '@prisma/client';
import { createContext, useContext, useMemo, useState } from 'react';

type TProvider = {
  children: React.ReactNode;
  initialSelectedWiki?: GithubWikiFile;
};
type TContext = {
  selectedWiki: GithubWikiFile | undefined;
  handleWikiChange: (wiki: GithubWikiFile | null) => void;
};

const WikiContext = createContext<TContext | null>(null);

export function WikiProvider({ children, initialSelectedWiki }: TProvider) {
  const { setQueryParams } = useQueryParams();
  const [selectedWiki, setSelectedWiki] = useState(initialSelectedWiki);

  const handleWikiChange = (wiki: GithubWikiFile | null) => {
    const pageId = wiki?.id ?? '';
    setSelectedWiki(wiki ?? undefined);
    setQueryParams('pageId', pageId, {
      shallow: true,
    });
  };

  const contextValue = useMemo(
    () => ({ selectedWiki, handleWikiChange }),
    [selectedWiki]
  );

  return (
    <WikiContext.Provider value={contextValue}>{children}</WikiContext.Provider>
  );
}

export const useWiki = () => {
  const wiki = useContext(WikiContext);
  if (!wiki) {
    throw new Error('useWiki must be used within a SocketProvider');
  }
  return wiki;
};
