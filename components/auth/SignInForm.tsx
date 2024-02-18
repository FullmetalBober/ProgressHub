import { cn } from '@/lib/utils';
import { Icons } from '../Icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function SignInForm({ className, ...props }: UserAuthFormProps) {
  // const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault();
  //   setIsLoading(true);

  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }

  const isLoading = false;

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {/* {isLoading && ( */}
            {/* <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )} */}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      <Button variant='outline' type='button' disabled={isLoading}>
        {/* {isLoading ? (
          <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
        ) : ( */}
        <Icons.gitHub className='mr-2 h-4 w-4' />
        {/* )} */} GitHub
      </Button>
    </div>
  );
}
