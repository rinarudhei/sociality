import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot='input'
      className={cn(
        'file:text-foreground text-md placeholder:text-md h-12 w-full min-w-0 gap-2 rounded-xl border border-neutral-900 bg-neutral-950 px-3 py-4 font-semibold -tracking-[0.02rem] transition-[color,box-shadow] outline-none selection:bg-neutral-950 selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-normal placeholder:-tracking-[0.02rem] placeholder:text-neutral-600 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-neutral-950',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        className
      )}
      {...props}
    />
  );
}

export { Input };
