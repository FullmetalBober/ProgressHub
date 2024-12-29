import { cn } from '@/tiptap/lib/utils';

export const Spinner = ({
  className,
  ref,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
  ref?: React.Ref<HTMLDivElement>;
}) => {
  const spinnerClass = cn(
    'animate-spin rounded-full border-2 border-current border-t-transparent h-4 w-4',
    className
  );

  return <div className={spinnerClass} ref={ref} {...rest} />;
};

Spinner.displayName = 'Spinner';
