import { cn } from '@moneytrack/web/lib/utils';
import { FC, PropsWithChildren } from 'react';

type ScrollContainer = PropsWithChildren<{
  className?: string;
  'data-testid'?: string;
}>;

export const ScrollContainer: FC<ScrollContainer> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto max-w-[82vw] md:w-full no-scrollbar',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
