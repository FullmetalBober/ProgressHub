import { TGithubAccount } from '@/lib/types';
import CustomAvatar from '../CustomAvatar';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import RepositoryCard from './RepositoryCard';

export default function RepositoryGroupComponent({
  group,
  defaultOpen = false,
}: Readonly<{
  group: TGithubAccount;
  defaultOpen: boolean;
}>) {
  const { id, name, repositories, avatarUrl } = group;

  return (
    <Accordion
      type='single'
      collapsible
      defaultValue={defaultOpen ? name : undefined}
    >
      <AccordionItem value={name} className='border-none'>
        <AccordionTrigger className='py-4'>
          <div className='flex items-center gap-3'>
            <CustomAvatar src={avatarUrl} name={name} className='h-8 w-8' />
            <div className='flex items-baseline gap-2'>
              <span className='text-xl font-medium'>{name}</span>
              <span className='text-sm text-muted-foreground'>
                ({repositories.length}{' '}
                {repositories.length === 1 ? 'репозиторій' : 'репозиторіїв'})
              </span>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {repositories.map(repository => (
            <RepositoryCard
              key={repository.id}
              accountId={id}
              repository={repository}
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
