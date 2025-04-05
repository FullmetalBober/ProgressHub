'use client';

import { removeGithubAppInstallation } from '@/lib/actions/githubApp.action';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import CustomAvatar from '../CustomAvatar';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function GithubApp(
  props: Readonly<{
    id: number;
    createdBy: string;
    info: {
      name: string;
      avatarUrl: string;
    };
    date: Date;
  }>
) {
  const [isDeleted, setIsDeleted] = useState(false);
  const configureLink = `https://github.com/settings/installations/${props.id}`;

  const removeHandler = async () => {
    const action = removeGithubAppInstallation(props.id);
    toast.promise(action, {
      loading: 'Deleting Github App...',
      success: 'Github App deleted successfully!',
      error: 'Github App deletion failed',
    });
    await action;
    setIsDeleted(true);
  };

  if (isDeleted) return null;
  return (
    <div className='flex flex-row items-center justify-between w-full h-full p-3'>
      <div className='flex flex-row gap-5 items-center'>
        <CustomAvatar
          src={props.info.avatarUrl}
          name={props.info.name}
          className='w-12 h-12 rounded'
        />
        <div>
          <h1 className='text-base font-bold'>{props.info.name}</h1>
          <span className='text-sm text-gray-500'>
            Enabled by {props.createdBy}{' '}
            {props.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            })}
          </span>
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>Actions</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem asChild>
            <Link href={configureLink} target='_blank'>
              Configure
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={removeHandler}>
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
