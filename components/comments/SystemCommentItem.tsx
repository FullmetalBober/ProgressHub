import { Comment, User } from '@/prisma/zod';
import { formatDistanceToNow } from 'date-fns';
import { uk } from 'date-fns/locale';
import CustomAvatar from '../CustomAvatar';

export default function SystemCommentItem({
  comment,
}: {
  comment: Comment & {
    author: User | null;
  };
}) {
  const { author } = comment;

  return (
    <div className='flex gap-3 items-center'>
      <CustomAvatar
        className='h-5 w-5'
        src={author?.image}
        name={author?.name}
      />
      <span className='font-medium text-sm'>
        {author?.name} {comment.body}
      </span>
      <span className='text-xs text-muted-foreground'>
        {formatDistanceToNow(new Date(comment.updatedAt), {
          addSuffix: true,
          locale: uk,
        })}
      </span>
    </div>
  );
}
