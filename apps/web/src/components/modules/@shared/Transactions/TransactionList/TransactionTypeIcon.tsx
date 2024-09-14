import { cn } from '@moneytrack/web/lib/utils';
import { getPriceSymbol } from '@moneytrack/web/utils/transactions';
import { TransactionTypeIds } from '../../../../../../db/seeders/transaction-types';
import { TTransaction } from '@moneytrack/web/types/transactions';
import { FC } from 'react';

type TransactionTypeIcon = {
  transactionType: TTransaction['transactionType'];
};

export const TransactionTypeIcon: FC<TransactionTypeIcon> = ({
  transactionType,
}) => (
  <span
    className={cn(
      'p-3 flex w-[35px] h-[35px] shadow-md rounded-md text-2xl font-bold justify-center items-center',
      {
        'text-danger': transactionType._id === TransactionTypeIds.Expense,
        'text-success': transactionType._id === TransactionTypeIds.Income,
      }
    )}
  >
    {getPriceSymbol(transactionType)}
  </span>
);
