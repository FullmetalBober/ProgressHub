'use client';

import { GithubWikiFile } from '@prisma/client';
import { createContext, useContext, useMemo, useState } from 'react';

type TProvider = {
  children: React.ReactNode;
  initialSelectedWiki?: GithubWikiFile;
};
type TContext = {
  selectedWiki: GithubWikiFile | undefined;
  setSelectedWiki: React.Dispatch<
    React.SetStateAction<GithubWikiFile | undefined>
  >;
};

const WikiContext = createContext<TContext | null>(null);

export function WikiProvider({ children, initialSelectedWiki }: TProvider) {
  const [selectedWiki, setSelectedWiki] = useState(initialSelectedWiki);

  const contextValue = useMemo(
    () => ({ selectedWiki, setSelectedWiki }),
    [selectedWiki, setSelectedWiki]
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
