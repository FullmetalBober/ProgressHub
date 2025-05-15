'use client';

import { Editor } from '@tiptap/core';
import { createContext, useContext, useMemo, useRef } from 'react';

type TProvider = {
  children: React.ReactNode;
};
type TContext = {
  currentTiptapEditor: React.RefObject<Editor | null>;
};

const TiptapEditorContext = createContext<TContext | null>(null);

export function TiptapEditorProvider({ children }: TProvider) {
  const currentTiptapEditor = useRef<Editor | null>(null);

  const contextValue = useMemo(
    () => ({ currentTiptapEditor }),
    [currentTiptapEditor]
  );

  return (
    <TiptapEditorContext.Provider value={contextValue}>
      {children}
    </TiptapEditorContext.Provider>
  );
}

export const useTiptapEditor = () => {
  const wiki = useContext(TiptapEditorContext);
  if (!wiki) {
    throw new Error(
      'useTiptapEditor must be used within a TiptapEditorProvider'
    );
  }
  return wiki;
};
