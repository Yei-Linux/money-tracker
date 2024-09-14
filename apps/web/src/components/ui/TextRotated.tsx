import { cn } from '@moneytrack/web/lib/utils';
import { FC, PropsWithChildren } from 'react';

type TextRotated = PropsWithChildren<{ classNames?: string }>;

export const TextRotated: FC<TextRotated> = ({ children, classNames }) => (
  <span
    className={cn(
      'text-black bg-muted font-bold p-2 rotate-6 flex w-fit',
      classNames
    )}
  >
    {children}
  </span>
);
