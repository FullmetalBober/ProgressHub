import { TiptapCollabProvider } from '@hocuspocus/provider';
import { User } from 'next-auth';
import type { Doc as YDoc } from 'yjs';

export interface TiptapProps {
  ydoc: YDoc;
  provider?: TiptapCollabProvider | null;
  user: User;
}

export type EditorUser = {
  clientId: string;
  name: string;
  color: string;
  initials?: string;
};
