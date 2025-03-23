'use client';

import { statusesWorkspaceMember } from '@/config/constants';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import {
  deleteWorkspaceMemberAsAdmin,
  deleteWorkspaceMemberAsOwner,
  updateWorkspaceMember,
} from '@/lib/actions/workspaceMember.action';
import { User, WorkspaceMember } from '@/prisma/zod';
import { ColumnDef } from '@tanstack/react-table';
import { X } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import CustomAvatar from '../CustomAvatar';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type tableRow = WorkspaceMember & {
  user: User;
};

const columns = (
  isSuperEditEnabled: boolean,
  isEditEnabled: boolean,
  currentUserId: string
): ColumnDef<tableRow>[] => [
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

      if (
        !isEditEnabled ||
        row.original.userId === currentUserId ||
        status?.value === 'OWNER'
      )
        return status?.label;
      return (
        <Select
          defaultValue={status?.value}
          onValueChange={async value => {
            const action = updateWorkspaceMember(row.original.id, {
              role: value,
            });
            toast.promise(action, {
              loading: 'Updating user role...',
              success: 'User role updated successfully!',
              error: 'Failed to update user role',
            });
            await action;
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusesWorkspaceMember.map(status => (
              <React.Fragment key={status.value}>
                {status.value !== 'OWNER' && (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                )}
              </React.Fragment>
            ))}
          </SelectContent>
        </Select>
      );
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
  {
    id: 'remove',
    cell: ({ row }) => {
      if (
        !isEditEnabled ||
        row.original.userId === currentUserId ||
        row.original.role === 'OWNER'
      )
        return;
      if (isEditEnabled && row.original.role === 'ADMIN') return;

      return (
        <AlertDialog>
          <AlertDialogTrigger>
            <X />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will kick user{' '}
                <span className='font-bold'>{row.original.user.name}</span> from
                workspace.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  const deleteWorkspaceMember = isSuperEditEnabled
                    ? deleteWorkspaceMemberAsOwner
                    : deleteWorkspaceMemberAsAdmin;

                  const action = deleteWorkspaceMember(row.original.id);
                  toast.promise(action, {
                    loading: 'Kicking user from workspace...',
                    success: 'User kicked successfully!',
                    error: 'Failed to kick user',
                  });
                  await action;
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];

export default function WorkspaceMembersTable({
  workspaceMembers,
  userId,
  isAdmin,
  isOwner,
}: Readonly<{
  workspaceMembers: tableRow[];
  userId: string;
  isAdmin: boolean;
  isOwner: boolean;
}>) {
  const workspaceInvitesObserved = useSocketObserver(
    'workspaceMember',
    workspaceMembers
  );

  return (
    <DataTable
      data={workspaceInvitesObserved}
      columns={columns(isOwner, isAdmin, userId)}
    />
  );
}
