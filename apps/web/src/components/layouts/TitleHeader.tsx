import { PropsWithChildren } from 'react';
import { Title } from '../ui/title';
import { cn } from '@moneytrack/web/lib/utils';

type TitleHeader = PropsWithChildren<{
  dataTestId?: string;
  className?: string;
}>;

export const TitleHeader = ({
  dataTestId,
  children,
  className,
}: TitleHeader) => {
  return (
    <div
      data-testid={dataTestId}
      className={cn(
        'flex justify-center items-center gap-1 w-full p-4 border shadow-sm',
        className
      )}
    >
      <Title as="h2" className="text-center">
        {children}
      </Title>

      <img
        width={100}
        height={100}
        src="./assets/welcome-pig.gif"
        alt="pet animated running"
      />
    </div>
  );
};
