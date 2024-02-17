import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

export const typographyVariants = cva('text-xl', {
  variants: {
    variant: {
      // blockquote: 'mt-6 border-l-2 pl-6 italic',
      ul: 'my-6 ml-6 list-disc [&>li]:mt-2',
    },
    affects: {
      default: '',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      removePMargin: '[&:not(:first-child)]:mt-0',
    },
  },
  defaultVariants: {
    variant: 'ul',
    affects: 'default',
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof typographyVariants> {}

const List = React.forwardRef<HTMLUListElement, TypographyProps>(
  ({ className, variant, affects, ...props }, ref) => {
    const Comp = variant || 'ul';
    return (
      <Comp
        className={cn(typographyVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
List.displayName = 'UL';

export default List;
