import { Badge } from '@/components/ui/badge';
import { formatDateByDayNumber } from '@/lib/date';
import { TTransaction } from '@/types/transactions';
import { FC } from 'react';

type TransactionItem = TTransaction;

export const TransactionItem: FC<TransactionItem> = ({
  price,
  title,
  description,
  createdAt,
  category: { category },
}) => {
  return (
    <div className="flex justify-between items-center shadow-sm rounded-md py-6 p-4 bg-white relative w-[340px] h-[115px]">
      <p className="font-bold">${price}</p>

      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-bold">{title}</p>
          <p className="text-xs">{description}</p>
        </div>

        <Badge className="text-xs">{category}</Badge>
      </div>

      <p className="text-xs absolute right-1 bottom-0 text-muted-foreground">
        {formatDateByDayNumber(createdAt.toString())}
      </p>
    </div>
  );
};
