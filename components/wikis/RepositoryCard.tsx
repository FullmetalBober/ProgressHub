import { TGithubRepository } from '@/lib/types';
import { GlobeIcon, LockIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CustomAvatar from '../CustomAvatar';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader } from '../ui/card';

export default function RepositoryCard(
  props: Readonly<{
    repository: TGithubRepository;
  }>
) {
  const { id, name, description, isPrivate, image } = props.repository;
  const params = useParams<{ workspaceId: string }>();

  return (
    <Link href={`/workspace/${params.workspaceId}/wikis/${id}`}>
      <Card className='h-full transition-all duration-300 hover:shadow-md dark:hover:shadow-primary/5 cursor-pointer'>
        <CardHeader className='pb-2'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-2'>
              <CustomAvatar src={image} name={name} className='h-6 w-6' />
              <span className='text-sm text-muted-foreground'>{name}</span>
            </div>
            {isPrivate ? (
              <Badge variant='outline' className='gap-1'>
                <LockIcon className='h-3 w-3' />
                <span className='text-xs'>Private</span>
              </Badge>
            ) : (
              <Badge variant='outline' className='gap-1'>
                <GlobeIcon className='h-3 w-3' />
                <span className='text-xs'>Public</span>
              </Badge>
            )}
          </div>
          <h3 className='mt-2 font-medium'>{name}</h3>
        </CardHeader>
        <CardContent>
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
