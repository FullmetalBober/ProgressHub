'use client';

import { useSocketObserver } from '@/hooks/useSocketObserver';
import { cancelWorkspaceInvite } from '@/lib/actions/workspaceInvite.action';
import { WorkspaceInvite } from '@/prisma/zod';
import { ColumnDef } from '@tanstack/react-table';
import { X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { DataTable } from '../ui/data-table';

type tableRow = WorkspaceInvite;

const columns = (isEditEnabled: boolean): ColumnDef<tableRow>[] => [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'createdAt',
    header: 'Дата запрошення',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return date.toLocaleDateString('uk-UA', {
        month: 'short',
        year: 'numeric',
      });
    },
  },
  {
    id: 'cancel',
    cell: ({ row }) => {
      if (!isEditEnabled) return;
      return (
        <AlertDialog>
          <AlertDialogTrigger>
            <X />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ви абсолютно впевнені?</AlertDialogTitle>
              <AlertDialogDescription>
                Ця дія скасує запрошення користувача{' '}
                <span className='font-bold'>{row.original.email}</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Скасувати</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  const { id } = row.original;

                  await cancelWorkspaceInvite(id);
                }}
              >
                Продовжити
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

export default function WorkspaceInvitesTable({
  workspaceInvites,
  isAdmin,
}: Readonly<{
  workspaceInvites: tableRow[];
  isAdmin: boolean;
}>) {
  const workspaceInvitesObserved = useSocketObserver(
    'workspaceInvite',
    workspaceInvites
  );

  return (
    <DataTable data={workspaceInvitesObserved} columns={columns(isAdmin)} />
  );
}
