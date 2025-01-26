'use client';

import { statusesWorkspaceMember } from '@/config/constants';
import { User, WorkspaceMember } from '@/prisma/zod';
import { ColumnDef } from '@tanstack/react-table';
import CustomAvatar from '../CustomAvatar';
import { DataTable } from '../ui/data-table';

type tableRow = WorkspaceMember & {
  user: User;
};

const columns: ColumnDef<tableRow>[] = [
  {
    accessorKey: 'user',
    header: 'Name',
    cell: ({ row }) => {
      const user: User = row.getValue('user');

      return (
        <div className='flex items-center'>
          <CustomAvatar
            src={user.image}
            name={user.email}
            className='w-6 h-6'
          />
          <div className='ml-2 font-medium'>{user.name}</div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorFn: row => row.user.email,
    header: 'Email',
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'role',
    header: 'Status',
    cell: ({ row }) => {
      const status = statusesWorkspaceMember.find(
        status => status.value === row.getValue('role')
      );

      return status?.label;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Joined',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return date.toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric',
      });
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];

export default function WorkspaceMembersTable({
  workspaceMembers,
}: Readonly<{
  workspaceMembers: tableRow[];
}>) {
  return <DataTable data={workspaceMembers} columns={columns} />;
}
