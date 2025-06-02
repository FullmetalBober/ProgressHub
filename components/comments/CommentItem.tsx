'use client';

import { deleteComment } from '@/lib/actions/comments.action';
import { cn } from '@/lib/utils';
import { Comment, User } from '@/prisma/zod';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import { EllipsisVertical, Reply } from 'lucide-react';
import type { User as SessionUser } from 'next-auth';
import { useState } from 'react';
import CustomAvatar from '../CustomAvatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import CommentCreateForm from './CommentCreateForm';
import CommentEditForm from './CommentEditForm';

export default function CommentItem({
  comment,
  childComment,
  user,
}: {
  user: SessionUser;
  comment: Comment & {
    author: User;
  };
  childComment?: (Comment & {
    author: User;
  })[];
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpenedReply, setIsOpenedReply] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const { author } = comment;

  const isChild = Boolean(comment.parentId);
  const isUserAuthor = user.id === comment.authorId;

  return (
    <Card>
      <CardHeader className='p-3 group pb-0'>
        <div className='flex justify-between'>
          <div className='flex gap-3 items-center'>
            <CustomAvatar
              className='h-5 w-5'
              src={author.image}
              name={author.name}
            />
            <span className='font-medium text-sm'>{author.name}</span>
            <span className='text-xs text-muted-foreground'>
              {formatDistanceToNow(new Date(comment.createdAt), {
                addSuffix: true,
                locale: uk,
              })}
            </span>
            {comment.isEdited && (
              <span className='text-xs text-muted-foreground'>(Змінено)</span>
            )}
          </div>
          <div
            className={cn(
              'gap-2 flex opacity-0 group-hover:opacity-100 transition-opacity duration-200',
              isDropdownOpen && 'opacity-100'
            )}
          >
            {!isChild && (
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsOpenedReply(true)}
              >
                <Reply />
              </Button>
            )}
            <AlertDialog>
              {isUserAuthor && !isEditMode && (
                <>
                  <DropdownMenu onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' size='icon'>
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setIsEditMode(true)}>
                        Редагувати
                      </DropdownMenuItem>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem>Видалити</DropdownMenuItem>
                      </AlertDialogTrigger>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Видалити цей коментар?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Усі відповіді на коментар також буде видалено
                        <br />
                        Цю дію не можна скасувати.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Відмінити</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteComment(comment.id)}
                      >
                        Продовжити
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </>
              )}
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className='px-3 py-2 group'>
        <CommentEditForm
          commentId={comment.id}
          body={comment.body}
          isEditMode={isEditMode}
          onEditModeChange={setIsEditMode}
        />
      </CardContent>
      {childComment && childComment?.length !== 0 && (
        <CardContent className='space-y-1 p-4'>
          {childComment?.map(child => (
            <CommentItem key={child.id} comment={child} user={user} />
          ))}
        </CardContent>
      )}
      {((childComment && childComment?.length !== 0) || isOpenedReply) && (
        <CardFooter className='p-0 border-t-2'>
          <CommentCreateForm
            user={user}
            issueId={comment.issueId}
            parentId={comment.id}
          />
        </CardFooter>
      )}
    </Card>
  );
}
