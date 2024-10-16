import { ChartIcon } from '@moneytrack/web/components/ui/icons/ChartIcon';
import { FC } from 'react';

type TransactionTypeItem = {
  counter: number;
  type: string;
  fillIcon: string;
  'data-testid'?: string;
};

export const TransactionTypeItem: FC<TransactionTypeItem> = ({
  counter,
  type,
  fillIcon,
  ...props
}) => {
  return (
    <div className="w-1/2 flex justify-around gap-3 mx-auto" {...props}>
      <div className="flex flex-col">
        <p className="font-bold text-xl">{counter}</p>
        <p className="text-sm text-muted-foreground">{type}</p>
      </div>
      <ChartIcon fill={fillIcon} />
    </div>
  );
};
