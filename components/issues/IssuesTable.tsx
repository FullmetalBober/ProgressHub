'use client';

import { prioritiesIssue, statusesIssue } from '@/config/constants';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { Issue, User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import CustomAvatar from '../CustomAvatar';
import { DataTable } from '../ui/data-table';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const columns: ColumnDef<
  Omit<Issue, 'description'> & {
    assignee: User;
  }
>[] = [
  {
    accessorKey: 'identifier',
    header: 'id',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    cell: ({ row }) => {
      return (
        <Tooltip>
          <TooltipTrigger className='max-w-[225px] md:max-w-[500px] lg:max-w-[800px] truncate font-medium'>
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
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'priority',
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
          <span>{priority.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'assignee',
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
];

const navigateBy: keyof Issue = 'identifier';

export default function IssuesTable({
  issues,
}: Readonly<{
  issues: (Omit<Issue, 'description'> & {
    assignee: User;
  })[];
}>) {
  const issuesObservable = useSocketObserver('issue', issues);
  const workspaceId = issues[0]?.workspaceId;

  return (
    <DataTable
      data={issuesObservable}
      columns={columns}
      navigateTo={`/workspace/${workspaceId}/issues`}
      navigateBy={navigateBy}
    />
  );
}
