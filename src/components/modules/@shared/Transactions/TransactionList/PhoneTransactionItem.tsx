import { Badge } from '@/components/ui/badge';
import { formatDateByDayNumber } from '@/lib/date';
import { TTransaction } from '@/types/transactions';
import { FC } from 'react';
import { TransactionTypeIcon } from './TransactionTypeIcon';
import { MoneyCurrency } from '../../MoneyCurrency';

type PhoneTransactionItem = TTransaction;

export const PhoneTransactionItem: FC<PhoneTransactionItem> = ({
  price,
  title,
  description,
  createdAt,
  transactionType,
  category: { category },
}) => {
  return (
    <div className="flex justify-between items-center border rounded-md py-6 p-4 bg-white relative w-[340px] h-[115px]">
      <div className="flex gap-10 items-center">
        <TransactionTypeIcon transactionType={transactionType} />

        <div className="flex justify-between items-center gap-3">
          <div className="flex flex-col gap-2 text-sm">
            <p className="font-bold">{title}</p>
            <p className="text-xs">{description}</p>
            <Badge className="text-xs w-fit" variant="secondary">
              {category}
            </Badge>
          </div>
        </div>
      </div>

      <MoneyCurrency money={price} variant="sm" />

      <p className="text-xs absolute right-[5px] bottom-[5px] text-muted-foreground">
        {formatDateByDayNumber(createdAt.toString())}
      </p>
    </div>
  );
};
