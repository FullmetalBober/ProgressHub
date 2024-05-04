import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Avatar = {
  src?: string | null;
  name?: string | null;
} & React.ComponentProps<typeof Avatar>;

export default function CustomAvatar({ src, name, ...props }: Avatar) {
  src = src ?? 'https://github.com/shadcn.png';
  name = name ?? 'A';

  return (
    <Avatar {...props}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
