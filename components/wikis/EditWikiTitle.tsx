'use client';

import { useSocketObserver } from '@/hooks/useSocketObserver';
import { updateGithubWikiFile } from '@/lib/actions/githubApp.action';
import {
  GithubWikiFile,
  GithubWikiFilePartial,
  GithubWikiFileUncheckedUpdateInputSchema,
} from '@/prisma/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutoSize from '../TextareaAutoSize';
import { Form, FormControl, FormField, FormItem } from '../ui/form';

export default function EditWikiTitle(
  props: Readonly<{
    wiki: Pick<GithubWikiFile, 'id' | 'path'>;
    wikiPaths: string[];
  }>
) {
  const [wikiObservable] = useSocketObserver('githubWikiFile', [props.wiki]);
  const { id, path } = wikiObservable;

  const form = useForm<GithubWikiFilePartial>({
    resolver: zodResolver(GithubWikiFileUncheckedUpdateInputSchema),
    defaultValues: {
      path,
    },
  });

  useEffect(() => {
    form.reset({ path });
  }, [form, path]);

  const onSubmit = async (data: GithubWikiFilePartial) => {
    if (Object.keys(form.formState.dirtyFields).length === 0) return;
    form.reset(data);

    await updateGithubWikiFile(id, data);
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name='path'
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <TextareaAutoSize
                {...field}
                currentValue={path}
                onBlur={form.handleSubmit(onSubmit)}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </Form>
  );
}
