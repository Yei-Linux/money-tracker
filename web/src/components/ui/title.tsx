import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

type As = `h${1 | 2 | 3 | 4 | 5 | 6}`;

type Title = PropsWithChildren<{
  as: As;
  className?: string;
}>;

export const Title: FC<Title> = ({ as: Component, children, className }) => {
  return (
    <Component className={cn('font-bold font-snicker text-4xl', className)}>
      {children}
    </Component>
  );
};
