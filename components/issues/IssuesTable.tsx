'use client';

import { prioritiesIssue, statusesIssue } from '@/config/constants';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { Issue, User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import CustomAvatar from '../CustomAvatar';
import { DataTable } from '../ui/data-table';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { IssueFilters, TFilters } from './IssueFilters';

const columns: ColumnDef<
  Omit<Issue, 'description'> & {
    assignee: User;
  }
>[] = [
  {
    accessorKey: 'identifier',
    header: 'ID',
    enableSorting: true,
    sortingFn: 'basic',
  },
  {
    accessorKey: 'title',
    header: 'Title',
    enableSorting: true,
    sortingFn: 'text',
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger className='max-w-[225px] md:max-w-[300px] lg:max-w-[400px] truncate font-medium'>
            {row.getValue('title')}
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue('title')}</p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const statusA = rowA.getValue(columnId);
      const statusB = rowB.getValue(columnId);

      const statusIndexA = statusesIssue.findIndex(s => s.value === statusA);
      const statusIndexB = statusesIssue.findIndex(s => s.value === statusB);

      return statusIndexA - statusIndexB;
    },
    cell: ({ row }) => {
      const status = statusesIssue.find(
        status => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {status.icon && (
            <div className='*:mr-2 *:h-4 *:w-4 *:text-muted-foreground'>
              <status.icon />
            </div>
          )}
          <span className='shrink-0'>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    enableSorting: true,
    sortingFn: (rowA, rowB, columnId) => {
      const priorityA = rowA.getValue(columnId);
      const priorityB = rowB.getValue(columnId);

      const priorityIndexA = prioritiesIssue.findIndex(
        p => p.value === priorityA
      );
      const priorityIndexB = prioritiesIssue.findIndex(
        p => p.value === priorityB
      );

      return priorityIndexA - priorityIndexB;
    },
    cell: ({ row }) => {
      const priority = prioritiesIssue.find(
        priority => priority.value === row.getValue('priority')
      );

      if (!priority) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {priority.icon && (
            <div className='*:mr-2 *:h-4 *:w-4 *:text-muted-foreground'>
              <priority.icon />
            </div>
          )}
          <span className='shrink-0'>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee',
    enableSorting: false,
    cell: ({ row }) => {
      const assignee: User = row.getValue('assignee');

      return (
        <CustomAvatar
          src={assignee.image}
          name={assignee.email}
          className='w-6 h-6'
        />
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    enableSorting: true,
    sortingFn: 'datetime',
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt');
      if (!(createdAt instanceof Date)) return null;
      const formattedDate = formatDistanceToNow(createdAt);

      return (
        <Tooltip>
          <TooltipTrigger className='text-muted-foreground text-sm'>
            {formattedDate}
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {new Date(createdAt as string | number | Date).toLocaleString()}
            </p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated',
    enableSorting: true,
    sortingFn: 'datetime',
    cell: ({ row }) => {
      const updatedAt = row.getValue('updatedAt');
      if (!(updatedAt instanceof Date)) return null;
      const formattedDate = formatDistanceToNow(updatedAt);

      return (
        <Tooltip>
          <TooltipTrigger className='text-muted-foreground text-sm'>
            {formattedDate}
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {new Date(updatedAt as string | number | Date).toLocaleString()}
            </p>
          </TooltipContent>
        </Tooltip>
      );
    },
  },
];

const navigateBy: keyof Issue = 'identifier';

export default function IssuesTable({
  issues,
}: Readonly<{
  issues: (Omit<Issue, 'description'> & {
    assignee: User;
  })[];
}>) {
  const [filters, setFilters] = useState<TFilters>({
    global: '',
    status: [],
    priority: [],
    usersIds: [],
  });
  const issuesObservable = useSocketObserver('issue', issues);
  const workspaceId = issues[0]?.workspaceId;
  const availableUsers = issuesObservable.reduce<User[]>((acc, issue) => {
    if (issue.assignee && !acc.some(user => user.id === issue.assignee.id)) {
      acc.push(issue.assignee);
    }
    return acc;
  }, []);

  const filteredIssues = issuesObservable.filter(issue => {
    const matchesGlobalFilter =
      filters.global === '' ||
      issue.title.toLowerCase().includes(filters.global.toLowerCase()) ||
      issue.identifier.toString().includes(filters.global);

    const matchesStatusFilter =
      filters.status.length === 0 || filters.status.includes(issue.status);

    const matchesPriorityFilter =
      filters.priority.length === 0 ||
      filters.priority.includes(issue.priority);

    const matchesAssigneeFilter =
      filters.usersIds.length === 0 ||
      filters.usersIds.includes(issue.assignee.id);

    return (
      matchesGlobalFilter &&
      matchesStatusFilter &&
      matchesPriorityFilter &&
      matchesAssigneeFilter
    );
  });

  return (
    <div className='space-y-4'>
      <IssueFilters
        filters={filters}
        setFilters={setFilters}
        users={availableUsers}
      />

      <p className='text-sm text-muted-foreground'>
        Showing {filteredIssues.length} of {issuesObservable.length} issues
      </p>

      <DataTable
        data={filteredIssues}
        columns={columns}
        navigateTo={`/workspace/${workspaceId}/issues`}
        navigateBy={navigateBy}
        defaultSorting={[{ id: 'identifier', desc: true }]}
      />
    </div>
  );
}
