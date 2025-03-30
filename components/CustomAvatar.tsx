import { getImageUrl } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Avatar = {
  src?: string | null;
  name?: string | null;
} & React.ComponentProps<typeof Avatar>;

export default function CustomAvatar({ src, name, ...props }: Avatar) {
  name = name ?? 'A';

  return (
    <Avatar {...props}>
      <AvatarImage src={getImageUrl(src)} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
