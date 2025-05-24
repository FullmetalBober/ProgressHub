import { prioritiesIssue, statusesIssue } from '@/config/constants';
import { User } from '@/prisma/zod';
import { IssuePriority, IssueStatus } from '@prisma/client';
import { Search, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MultiSelect } from '../ui/multi-select';

export type TFilters = {
  global: string;
  status: IssueStatus[];
  priority: IssuePriority[];
  usersIds: string[];
};

export function IssueFilters({
  filters,
  setFilters,
  users,
}: {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
  users: User[];
}) {
  const clearAllFilters = () => {
    setFilters({
      global: '',
      status: [],
      priority: [],
      usersIds: [],
    });
  };
  return (
    <div className='flex sm:flex-row gap-2 flex-wrap items-center'>
      <div className='flex items-center border rounded-md px-3 w-full sm:max-w-sm shrink-0'>
        <Search className='h-4 w-4 text-muted-foreground mr-2' />
        <Input
          placeholder='Search issues...'
          value={filters.global}
          onChange={e =>
            setFilters(prev => ({
              ...prev,
              global: e.target.value,
            }))
          }
          className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0'
        />
        {filters.global && (
          <button
            onClick={() => setFilters(prev => ({ ...prev, global: '' }))}
            className='text-muted-foreground hover:text-foreground'
          >
            <XIcon className='h-4 w-4' />
          </button>
        )}
      </div>

      <div>
        <MultiSelect
          options={statusesIssue.map(status => ({
            value: status.value,
            label: status.label,
          }))}
          selected={filters.status.map(s => s)}
          onChange={selected =>
            setFilters(prev => ({
              ...prev,
              status: selected as IssueStatus[],
            }))
          }
          placeholder='Filter'
        />
      </div>

      <div>
        <MultiSelect
          options={prioritiesIssue.map(priority => ({
            value: priority.value,
            label: priority.label,
          }))}
          selected={filters.priority.map(p => p)}
          onChange={selected =>
            setFilters(prev => ({
              ...prev,
              priority: selected as IssuePriority[],
            }))
          }
          placeholder='Priority'
        />
      </div>

      <div>
        <MultiSelect
          options={users.map(user => ({
            value: user.id,
            label: user.name,
            image: user.image,
          }))}
          selected={filters.usersIds}
          onChange={selected =>
            setFilters(prev => ({
              ...prev,
              usersIds: selected,
            }))
          }
          placeholder='Assignee'
        />
      </div>

      {(filters.global ||
        filters.status.length > 0 ||
        filters.priority.length > 0 ||
        filters.usersIds.length > 0) && (
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
  );
}
