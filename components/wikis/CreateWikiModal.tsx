'use client';

import { createGithubWikiFile } from '@/lib/actions/githubApp.action';
import {
  GithubWikiFile,
  GithubWikiFileUncheckedCreateInputSchema,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { SidebarGroupAction } from '../ui/sidebar';

export default function CreateWikiModal({
  installationId,
  repositoryId,
  wikiPaths,
}: Readonly<{
  installationId: number;
  repositoryId: number;
  wikiPaths: string[];
}>) {
  const [open, setOpen] = useState(false);

  const form = useForm<GithubWikiFile>({
    resolver: zodResolver(
      GithubWikiFileUncheckedCreateInputSchema.refine(
        data => !wikiPaths.includes(data.path),
        {
          message: 'Wiki page already exists',
          path: ['path'],
        }
      )
    ),
    defaultValues: {
      installationId,
      githubRepositoryId: repositoryId,
      path: '',
    },
  });

  async function onSubmit(data: GithubWikiFile) {
    const action = createGithubWikiFile(data);
    toast.promise(action, {
      loading: 'Створення вікі сторінки...',
      success: 'Сторінку вікі створено!',
      error: 'Не вдалося створити сторінку вікі',
    });
    await action;

    form.reset();
    setOpen(false);
  }

  const isFormDisabled = form.formState.isSubmitting || !form.formState.isValid;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction title='Додати нову сторінку'>
          <Plus />
          <span className='sr-only'>Додати сторінку</span>
        </SidebarGroupAction>
      </DialogTrigger>
      <DialogContent className='sm:max-w-3xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <DialogHeader>
              <DialogTitle>Додати сторінку</DialogTitle>
              <DialogDescription>
                Введіть назву сторінки, яку ви хочете створити. Сторінка не буде
                відображена у репозиторії до тих пір, поки ви не синхронізуєтесь
                з Github.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name='path'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Wiki назва' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='submit' disabled={isFormDisabled}>
                Додати
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
