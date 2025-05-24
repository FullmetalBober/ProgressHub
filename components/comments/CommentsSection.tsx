'use client';

import { Separator } from '@/components/ui/separator';
import { Comment, User } from '@/prisma/zod';
import { SocketRoomEmitterProvider } from '@/providers/SocketRoomProvider';
import type { User as SessionUser } from 'next-auth';
import CommentCreateForm from './CommentCreateForm';
import CommentList from './CommentList';

export default function CommentsSection({
  issueId,
  user,
  comments,
}: Readonly<{
  issueId: string;
  user: SessionUser;
  comments: (Comment & {
    author: User | null;
  })[];
}>) {
  return (
    <SocketRoomEmitterProvider room={issueId}>
      <div className='mt-8'>
        <div className='flex items-center mb-6'>
          <h3 className='text-lg font-medium'>Activity</h3>
        </div>

        <CommentList comments={comments} user={user} />

        <Separator className='my-4' />

        <CommentCreateForm user={user} issueId={issueId} />
      </div>
    </SocketRoomEmitterProvider>
  );
}
