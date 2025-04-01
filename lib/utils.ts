import { WorkspaceMember } from '@/prisma/zod';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}${path}`;
}

export function getImageUrl(key?: string | null) {
  if (key?.startsWith('https://')) return key;
  else if (key) return `https://ijhhu279hm.ufs.sh/f/${key}`;
  return 'https://github.com/shadcn.png';
}

export function checkIsOwner(
  sessionUserId: string,
  workspaceMembers: Pick<WorkspaceMember, 'userId' | 'role'>[]
) {
  return workspaceMembers.some(
    ({ userId, role }) => sessionUserId === userId && role === 'OWNER'
  );
}

export function checkIsOwnerOrAdmin(
  sessionUserId: string,
  workspaceMembers: Pick<WorkspaceMember, 'userId' | 'role'>[]
) {
  return workspaceMembers.some(
    ({ userId, role }) =>
      sessionUserId === userId && (role === 'OWNER' || role === 'ADMIN')
  );
}
