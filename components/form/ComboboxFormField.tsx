import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import { FormControl, FormField, FormItem } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Property = {
  value: string;
  label: string;
  icon: React.ReactElement;
};

export default function ComboboxFormField({
  form,
  fieldName,
  properties,
}: {
  form: UseFormReturn;
  fieldName: string;
  properties: Properties[];
}) {
  const value = form.watch(fieldName);
  const selectedStatus = properties.find(priority => priority.value === value);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  size='sm'
                  className='justify-start'
                >
                  {field.value ? (
                    <>
                      {selectedStatus && (
                        <selectedStatus.icon className='mr-2 h-4 w-4 shrink-0' />
                      )}
                      {selectedStatus?.label}
                    </>
                  ) : (
                    `Set ${fieldName}`
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
                  {properties.map(status => (
                    <CommandItem
                      value={status.label}
                      key={status.value}
                      onSelect={() => {
                        form.setValue(fieldName, status.value);
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
