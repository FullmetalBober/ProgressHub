'use client';

import { prioritiesIssue, statusesIssue } from '@/config/constants';
import { useSocketObserver } from '@/hooks/useSocketObserver';
import { Issue, IssuePriority, IssueStatus, User } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { Filter, Search, XIcon } from 'lucide-react';
import { useState } from 'react';
import { BadgeRemovable } from '../BadgeRemovable';
import CustomAvatar from '../CustomAvatar';
import { Button } from '../ui/button';
import { DataTable } from '../ui/data-table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

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
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus[]>([]);
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority[]>([]);

  const issuesObservable = useSocketObserver('issue', issues);
  const workspaceId = issues[0]?.workspaceId;

  const filteredIssues = issuesObservable.filter(issue => {
    const matchesGlobalFilter =
      globalFilter === '' ||
      issue.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
      issue.identifier.toString().includes(globalFilter);

    const matchesStatusFilter =
      statusFilter.length === 0 || statusFilter.includes(issue.status);

    const matchesPriorityFilter =
      priorityFilter.length === 0 || priorityFilter.includes(issue.priority);

    return matchesGlobalFilter && matchesStatusFilter && matchesPriorityFilter;
  });

  const clearAllFilters = () => {
    setGlobalFilter('');
    setStatusFilter([]);
    setPriorityFilter([]);
  };

  return (
    <div className='space-y-4'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex items-center border rounded-md px-3 w-full sm:max-w-sm'>
          <Search className='h-4 w-4 text-muted-foreground mr-2' />
          <Input
            placeholder='Search issues...'
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
          />
          {globalFilter && (
            <button
              onClick={() => setGlobalFilter('')}
              className='text-muted-foreground hover:text-foreground'
            >
              <XIcon className='h-4 w-4' />
            </button>
          )}
        </div>

        <div className='flex flex-wrap items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 gap-1'>
                <Filter className='h-4 w-4' />
                Status
                {statusFilter.length > 0 && (
                  <span className='ml-1 rounded-full bg-primary w-5 h-5 flex items-center justify-center text-primary-foreground'>
                    {statusFilter.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
              {statusesIssue.map(status => (
                <DropdownMenuCheckboxItem
                  key={status.value}
                  checked={statusFilter.includes(status.value)}
                  onSelect={() => {
                    if (statusFilter.includes(status.value)) {
                      setStatusFilter(prev =>
                        prev.filter(s => s !== status.value)
                      );
                    } else {
                      setStatusFilter(prev => [...prev, status.value]);
                    }
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <status.icon className='h-4 w-4' />
                    <span>{status.label}</span>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-8 gap-1'>
                <Filter className='h-4 w-4' />
                Priority
                {priorityFilter.length > 0 && (
                  <span className='ml-1 rounded-full bg-primary w-5 h-5 text-[10px] flex items-center justify-center text-primary-foreground'>
                    {priorityFilter.length}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
              {prioritiesIssue.map(priority => (
                <DropdownMenuCheckboxItem
                  key={priority.value}
                  checked={priorityFilter.includes(priority.value)}
                  onSelect={() => {
                    if (priorityFilter.includes(priority.value)) {
                      setPriorityFilter(prev =>
                        prev.filter(p => p !== priority.value)
                      );
                    } else {
                      setPriorityFilter(prev => [...prev, priority.value]);
                    }
                  }}
                >
                  <div className='flex items-center gap-2'>
                    <priority.icon className='h-4 w-4' />
                    <span>{priority.label}</span>
                  </div>
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(globalFilter ||
            statusFilter.length > 0 ||
            priorityFilter.length > 0) && (
            <Button
              variant='ghost'
              size='sm'
              onClick={clearAllFilters}
              className='h-8'
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      {(statusFilter.length > 0 || priorityFilter.length > 0) && (
        <div className='flex flex-wrap gap-2 mt-2 mb-1'>
          <div className='text-sm text-muted-foreground mr-1'>
            Active filters:
          </div>
          {statusFilter.map(status => {
            const statusObj = statusesIssue.find(s => s.value === status);
            if (!statusObj) return null;

            return (
              <BadgeRemovable
                key={status}
                Icon={statusObj.icon}
                label={statusObj.label}
                onRemove={() =>
                  setStatusFilter(statusFilter.filter(s => s !== status))
                }
              />
            );
          })}

          {priorityFilter.map(priority => {
            const priorityObj = prioritiesIssue.find(p => p.value === priority);
            if (!priorityObj) return null;

            return (
              <BadgeRemovable
                key={priority}
                Icon={priorityObj.icon}
                label={priorityObj.label}
                onRemove={() =>
                  setPriorityFilter(priorityFilter.filter(p => p !== priority))
                }
              />
            );
          })}
        </div>
      )}

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
