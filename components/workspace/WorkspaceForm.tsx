import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { WorkspaceUncheckedCreateInputSchema } from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Workspace } from '@prisma/client';
import { useForm } from 'react-hook-form';

export default function WorkspaceForm({
  submitHandler,
  workspace,
}: Readonly<{
  submitHandler: (data: any) => void;
  workspace?: Workspace;
}>) {
  //! Prisma.WorkspaceUncheckedCreateInput
  const form = useForm<any>({
    resolver: zodResolver(WorkspaceUncheckedCreateInputSchema),
    defaultValues: {
      name: '',
      ...workspace,
    },
  });

  const isFormDisabled = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className='grid gap-3'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder='Enter workspace name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isFormDisabled} className='w-full'>
          {workspace ? 'Update' : 'Create'} workspace
        </Button>
      </form>
    </Form>
  );
}
