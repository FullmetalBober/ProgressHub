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
    <div className='flex gap-3 items-start'>
      <CustomAvatar
        className='h-5 w-5'
        src={author?.image}
        name={author?.name}
      />
      <div className='flex-1 min-w-0'>
        <span className='font-medium text-sm break-words'>
          {author?.name} {comment.body}
        </span>
        <div className='text-xs text-muted-foreground mt-1'>
          {formatDistanceToNow(new Date(comment.updatedAt), {
            addSuffix: true,
            locale: uk,
          })}
        </div>
      </div>
    </div>
  );
}
