import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

type Avatar = {
  src?: string;
  name?: string;
} & React.ComponentProps<typeof Avatar>;

export default async function CustomAvatar({ src, name, ...props }: Avatar) {
  return (
    <Avatar {...props}>
      <AvatarImage src={src || 'https://github.com/shadcn.png'} alt={name} />
      <AvatarFallback>{name[0]}</AvatarFallback>
    </Avatar>
  );
}
