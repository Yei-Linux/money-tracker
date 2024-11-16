import { cn } from '@moneytrack/web/lib/utils';
import { PropsWithChildren } from 'react';

type CardSelector = PropsWithChildren<{ className?: string }>;

export const CardSelector = ({ children, className }: CardSelector) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-6 rounded-lg p-4 shadow-sm min-w-[250px] w-fit bg-muted',
        className
      )}
    >
      {children}
    </div>
  );
};
