'use client';

import { Comment, User } from '@/prisma/zod';
import { formatDistanceToNow } from 'date-fns';
import CustomAvatar from '../CustomAvatar';
import { Card, CardContent, CardHeader } from '../ui/card';

export default function CommentItem({
  comment,
  childComment,
}: {
  comment: Comment & {
    author: User;
  };
  childComment: (Comment & {
    author: User;
  })[];
}) {
  const { author } = comment;

  return (
    <Card>
      <CardHeader className='p-3'>
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
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent>{comment.body}</CardContent>
    </Card>
  );
}
