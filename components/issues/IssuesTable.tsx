'use client';

import { priorities, statuses } from '@/config/constants';
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
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && 'indeterminate')
  //       }
  //       onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={value => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //       className='translate-y-[2px]'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'identifier',
    header: 'id',
    // cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'title',
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title='Title' />
    // ),
    cell: ({ row }) => {
      // const label = labels.find(label => label.value === row.original.label);

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
      // <div className='flex space-x-2'>
      // {label && <Badge variant='outline'>{label.label}</Badge>}
      // </div>
    },
  },
  {
    accessorKey: 'status',
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title='Status' />
    // ),
    cell: ({ row }) => {
      const status = statuses.find(
        status => status.value === row.getValue('status')
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {status.icon && (
            <div className='*:mr-2 *:h-4 *:w-4 *:text-muted-foreground'>
              {status.icon}
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
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title='Priority' />
    // ),
    cell: ({ row }) => {
      const priority = priorities.find(
        priority => priority.value === row.getValue('priority')
      );

      if (!priority) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {priority.icon && (
            <div className='*:mr-2 *:h-4 *:w-4 *:text-muted-foreground'>
              {priority.icon}
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
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title='Priority' />
    // ),
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
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
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
