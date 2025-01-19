'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { FormControl, FormField, FormItem } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

type Property = {
  value: string;
  label: string;
  icon: React.ReactElement<unknown>;
};

export default function ComboboxFormField({
  form,
  fieldName,
  properties,
}: Readonly<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  fieldName: string;
  properties: Property[];
}>) {
  const [open, setOpen] = useState(false);

  const value = form.watch(fieldName);
  const selectedStatus = properties.find(priority => priority.value === value);

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  size='sm'
                  className='justify-start flex items-center'
                  aria-expanded={open}
                >
                  {field.value ? (
                    <>
                      {selectedStatus && (
                        <div className='*:mr-2 *:h-4 *:w-4 *:shrink-0'>
                          {selectedStatus.icon}
                        </div>
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
            <PopoverContent className='p-0'>
              <Command>
                <CommandInput placeholder='Change status...' />
                {/* <CommandEmpty>No result found.</CommandEmpty> */}
                <CommandList>
                  <CommandGroup>
                    {properties.map(status => (
                      <CommandItem
                        value={status.label}
                        key={status.value}
                        onSelect={() => {
                          form.setValue(fieldName, status.value, {
                            shouldDirty: true,
                          });
                          setOpen(false);
                        }}
                      >
                        <div
                          className={cn(
                            '*:mr-2 *:h-4 *:w-4',
                            status.value === selectedStatus?.value
                              ? '*:opacity-100'
                              : '*:opacity-40'
                          )}
                        >
                          {status.icon}
                        </div>
                        <span>{status.label}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
