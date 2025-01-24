import { VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const textareaVariants = cva(
  'flex min-h-[80px] w-full rounded-md px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-background border border-input focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        ghost: 'bg-transparent focus:outline-none',
      },
      textSize: {
        default: 'text-sm h-10',
        '3xl': 'text-3xl font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      textSize: 'default',
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, textSize, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          textareaVariants({ variant, textSize, className }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
