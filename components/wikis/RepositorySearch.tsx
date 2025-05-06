import { SearchIcon } from 'lucide-react';
import { Input } from '../ui/input';

export default function RepositorySearch(
  props: Readonly<{
    onSearch: (search: string) => void;
  }>
) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearch(e.target.value);
  };

  return (
    <div className='relative'>
      <SearchIcon className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
      <Input
        type='text'
        placeholder='Search repositories...'
        onChange={handleChange}
        className='pl-9'
      />
    </div>
  );
}
