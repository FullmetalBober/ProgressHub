import { useSocketObserver } from '@/hooks/useSocketObserver';
import { Comment, User } from '@/prisma/zod';
import CommentItem from './CommentItem';

export default function CommentList({
  comments,
}: {
  comments: (Comment & {
    author: User;
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
      {topLevelComments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          childComment={getReplies(comment.id)}
        />
      ))}
    </div>
  );
}
