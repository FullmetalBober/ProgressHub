import { cn } from '@/lib/utils';
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  XCircle,
} from 'lucide-react';
import { Field } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import { FormControl, FormField, FormItem } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: HelpCircle,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: Circle,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: ArrowUpCircle,
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircle2,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: XCircle,
  },
];

export default function StatusComboboxFormField({ form }: { form: Field }) {
  const value = form.watch('status');
  const selectedStatus = statuses.find(status => status.value === value);

  return (
    <FormField
      control={form.control}
      name='status'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  size='sm'
                  className='w-[150px] justify-start'
                >
                  {field.value ? (
                    <>
                      <selectedStatus.icon className='mr-2 h-4 w-4 shrink-0' />
                      {selectedStatus.label}
                    </>
                  ) : (
                    'Set status'
                  )}
                  {/* <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' /> */}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
              <Command>
                <CommandInput placeholder='Change status...' />
                {/* <CommandEmpty>No result found.</CommandEmpty> */}
                <CommandGroup>
                  {statuses.map(status => (
                    <CommandItem
                      value={status.label}
                      key={status.value}
                      onSelect={() => {
                        form.setValue('status', status.value);
                      }}
                    >
                      <status.icon
                        className={cn(
                          'mr-2 h-4 w-4',
                          status.value === selectedStatus?.value
                            ? 'opacity-100'
                            : 'opacity-40'
                        )}
                      />
                      <span>{status.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
