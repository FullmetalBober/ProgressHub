'use client';

import { TSocketEmit, useSocketEmitter } from '@/context/SocketEmitterContext';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { cancelWorkspaceInvite } from '@/lib/actions/workspaceInvite.action';
import { WorkspaceInvite } from '@/prisma/zod';
import { ColumnDef } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';

type tableRow = WorkspaceInvite;

const columns = (emit: TSocketEmit): ColumnDef<tableRow>[] => [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  // {
  //   accessorKey: 'role',
  //   header: 'Status',
  //   cell: ({ row }) => {
  //     const status = statusesWorkspaceMember.find(
  //       status => status.value === row.getValue('role')
  //     );

  //     return status?.label;
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    accessorKey: 'createdAt',
    header: 'Invited on',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return date.toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric',
      });
    },
  },
  {
    id: 'cancel',
    cell: ({ row }) => (
      <Button
        variant='outline'
        size='icon'
        onClick={async () => {
          const { id } = row.original;

          await cancelWorkspaceInvite(id);
          emit('workspaceInvite', 'delete', {
            id,
          });
        }}
      >
        <X />
      </Button>
    ),
  },
];

export default function WorkspaceInvitesTable({
  workspaceInvites,
}: Readonly<{
  workspaceInvites: tableRow[];
}>) {
  const { emit } = useSocketEmitter();
  const workspaceInvitesObserved = useSocketObserver(
    'workspaceInvite',
    workspaceInvites
  );

  return <DataTable data={workspaceInvitesObserved} columns={columns(emit)} />;
}
