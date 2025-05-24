import { LucideIcon, XIcon } from 'lucide-react';
import { Badge } from './ui/badge';

export function BadgeRemovable({
  Icon,
  label,
  onRemove,
}: {
  Icon: LucideIcon;
  label: string;
  onRemove: () => void;
}) {
  return (
    <Badge variant='secondary' className='flex items-center gap-1 text-xs'>
      <Icon className='h-3 w-3 text-muted-foreground' />
      <span>{label}</span>
      <button
        onClick={onRemove}
        className='ml-1 text-muted-foreground hover:text-foreground'
      >
        <XIcon className='h-3 w-3' />
      </button>
    </Badge>
  );
}
