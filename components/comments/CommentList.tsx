import { useSocketObserver } from '@/hooks/useSocketObserver';
import { Comment, User } from '@/prisma/zod';
import type { User as SessionUser } from 'next-auth';
import CommentItem from './CommentItem';
import SystemCommentItem from './SystemCommentItem';

function getNonSystemComment(
  comment: Comment & {
    author: User | null;
  }
) {
  if (!comment.author) throw new Error('No author found');
  return {
    ...comment,
    author: comment.author,
  };
}

export default function CommentList({
  user,
  comments,
}: {
  user: SessionUser;
  comments: (Comment & {
    author: User | null;
  })[];
}) {
  const observedComments = useSocketObserver('comment', comments);

  const topLevelComments = observedComments.filter(
    comment => !comment.parentId
  );

  const getReplies = (commentId: string) =>
    observedComments.filter(comment => comment.parentId === commentId);

  return (
    <div className='space-y-4'>
      {topLevelComments.map(comment => {
        if (comment.isSystem)
          return <SystemCommentItem key={comment.id} comment={comment} />;
        return (
          <CommentItem
            key={comment.id}
            user={user}
            comment={getNonSystemComment(comment)}
            childComment={getReplies(comment.id).map(getNonSystemComment)}
          />
        );
      })}
    </div>
  );
}
