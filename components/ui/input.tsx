import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'flex w-full rounded-md px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-background border border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        ghost: 'bg-transparent focus:outline-none',
      },
      textSize: {
        default: 'text-sm h-10',
        lg: 'text-4xl font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      textSize: 'default',
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant, textSize, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, textSize, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
