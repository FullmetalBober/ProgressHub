'use client';

import { Separator } from '@/components/ui/separator';
import { Comment, User } from '@/prisma/zod';
import { SocketRoomEmitterProvider } from '@/providers/SocketRoomProvider';
import type { User as SessionUser } from 'next-auth';
import CommentForm from './CommentCreateForm';
import CommentList from './CommentList';

export default function CommentsSection({
  issueId,
  user,
  comments,
}: Readonly<{
  issueId: string;
  user: SessionUser;
  comments: (Comment & {
    author: User;
  })[];
}>) {
  return (
    <SocketRoomEmitterProvider room={issueId}>
      <div className='mt-8'>
        <div className='flex items-center mb-6'>
          <h3 className='text-lg font-medium'>Activity</h3>
          <div className='ml-auto'>
            <button className='text-sm text-muted-foreground hover:text-foreground'>
              Unsubscribe
            </button>
          </div>
        </div>

        <CommentList comments={comments} />

        <Separator className='my-4' />

        <CommentForm user={user} issueId={issueId} />
      </div>
    </SocketRoomEmitterProvider>
  );
}
