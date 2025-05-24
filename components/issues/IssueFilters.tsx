import { prioritiesIssue, statusesIssue } from '@/config/constants';
import { IssuePriority, IssueStatus } from '@prisma/client';
import { Search, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MultiSelect } from '../ui/multi-select';

export type TFilters = {
  global: string;
  status: IssueStatus[];
  priority: IssuePriority[];
};

export function IssueFilters({
  filters,
  setFilters,
}: {
  filters: TFilters;
  setFilters: React.Dispatch<React.SetStateAction<TFilters>>;
}) {
  const clearAllFilters = () => {
    setFilters({
      global: '',
      status: [],
      priority: [],
    });
  };
  return (
    <div className='flex sm:flex-row gap-2 flex-wrap'>
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

      {(filters.global ||
        filters.status.length > 0 ||
        filters.priority.length > 0) && (
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
