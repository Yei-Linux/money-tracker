import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

type ScrollContainer = PropsWithChildren<{
  className?: string;
}>;

export const ScrollContainer: FC<ScrollContainer> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto max-w-[82vw] md:w-full no-scrollbar',
        className
      )}
    >
      {children}
    </div>
  );
};
